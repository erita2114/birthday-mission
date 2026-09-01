const BM_GAME = Object.freeze({ PREVIEW_PARAM: 'preview' });

const params = new URLSearchParams(window.location.search);
const gameId = String(params.get('g') || '').trim().toUpperCase();
const previewToken = String(params.get(BM_GAME.PREVIEW_PARAM) || '').trim();
const isPreview = Boolean(previewToken);

let previewStage = 1;
let previewTotalStage = 1;
const previewHints = new Map();
let currentMission = null;
let currentFinalResult = null;
let countdownTimer = null;
let rescueTimer = null;
let actionBusy = false;
let toastTimer = null;

const previewBanner = document.getElementById('previewBanner');
const startBtn = document.getElementById('startBtn');
const hintAnswerInput = document.getElementById('hintAnswerInput');
const hintSubmitBtn = document.getElementById('hintSubmitBtn');
const hintQuestion = document.getElementById('hintQuestion');
const hintFeedback = document.getElementById('hintFeedback');
const hintReveal = document.getElementById('hintReveal');
const hintText = document.getElementById('hintText');
const missionCodeInput = document.getElementById('missionCodeInput');
const missionUnlockBtn = document.getElementById('missionUnlockBtn');
const codeFeedback = document.getElementById('codeFeedback');
const rescueBtn = document.getElementById('rescueBtn');
const rescueTitle = document.getElementById('rescueTitle');
const rescueDescription = document.getElementById('rescueDescription');
const rescueStatus = document.getElementById('rescueStatus');
const revealGiftBtn = document.getElementById('revealGiftBtn');
const normalReportBtn = document.getElementById('normalReportBtn');
const rescueReportBtn = document.getElementById('rescueReportBtn');
const previewRevealBtn = document.getElementById('previewRevealBtn');
const previewReportBtn = document.getElementById('previewReportBtn');
const restartPreviewBtn = document.getElementById('restartPreviewBtn');
const previewGiftRestartBtn = document.getElementById('previewGiftRestartBtn');
const unlockCardBtn = document.getElementById('unlockCardBtn');
const previewCardBtn = document.getElementById('previewCardBtn');
const previewCardRestartBtn = document.getElementById('previewCardRestartBtn');
const toast = document.getElementById('toast');

/* Phase 07-3: Preview Report 強制事件代理，避免單一按鈕綁定失效 */
document.addEventListener('click', event => {
  const button = event.target.closest?.('#previewReportBtn');
  if (!button) return;
  event.preventDefault();
  openPreviewReport();
});

init();

async function init() {
  if (!gameId) {
    showError('網址缺少 Game ID。');
    return;
  }

  if (isPreview) previewBanner.hidden = false;
  bindEvents();

  try {
    if (isPreview) await loadPreviewState();
    else await loadFormalState();
  } catch (error) {
    showError(error.message || 'Birthday Mission 讀取失敗。');
  }
}

function bindEvents() {
  startBtn.addEventListener('click', handleStart);
  hintSubmitBtn.addEventListener('click', handleHint);
  missionUnlockBtn.addEventListener('click', handleUnlock);
  rescueBtn.addEventListener('click', handleRescue);
  revealGiftBtn.addEventListener('click', handleRevealGift);
  normalReportBtn.addEventListener('click', openFormalReport);
  rescueReportBtn.addEventListener('click', openFormalReport);
  previewRevealBtn.addEventListener('click', handlePreviewRevealGift);
  unlockCardBtn.addEventListener('click', handleUnlockPermanentCard);
  previewCardBtn.addEventListener('click', handlePreviewCard);
  restartPreviewBtn.addEventListener('click', restartPreview);
  previewGiftRestartBtn.addEventListener('click', restartPreview);
  previewCardRestartBtn.addEventListener('click', restartPreview);

  hintAnswerInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleHint();
    }
  });

  missionCodeInput.addEventListener('input', () => {
    missionCodeInput.value = missionCodeInput.value.replace(/\D/g, '').slice(0, 4);
  });

  missionCodeInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleUnlock();
    }
  });
}

async function callApi(payload) {
  const response = await fetch(BM_CONFIG.API_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const result = await response.json();
  if (result.ok !== true) throw new Error(result.error || '系統連線失敗。');
  return result;
}

async function loadFormalState() {
  showScreen('loadingScreen');

  const result = await callApi({ action: 'state', g: gameId });

  switch (result.status) {
    case 'WAITING_APPROVAL':
      showScreen('waitingScreen');
      return;
    case 'DISABLED':
      showScreen('disabledScreen');
      return;
    case 'LOCKED':
      renderLocked(result);
      return;
    case 'READY':
      renderReady(result, false);
      return;
    case 'ACTIVE':
      renderMission(result, false);
      return;
    case 'ALL_MISSIONS_COMPLETE':
      renderAllComplete();
      return;
    case 'GIFT_REVEALED':
      currentFinalResult = result;
      if (result.revealMethod === 'RESCUE') renderRescueSuccess(result);
      else renderGiftReveal(result);
      return;
    case 'CARD':
      renderBirthdayCard(result, false);
      return;
    default:
      throw new Error('未知遊戲狀態。');
  }
}

async function loadPreviewState() {
  showScreen('loadingScreen');

  const result = await callApi({
    action: 'previewState',
    g: gameId,
    preview: previewToken,
  });

  switch (result.status) {
    case 'WAITING_APPROVAL':
      showScreen('waitingScreen');
      return;
    case 'DISABLED':
      showScreen('disabledScreen');
      return;
    case 'PREVIEW_READY':
      previewStage = 1;
      previewTotalStage = Number(result.totalStage);
      renderReady(result, true);
      return;
    default:
      throw new Error('未知 Preview 狀態。');
  }
}

async function handleStart() {
  if (actionBusy) return;
  actionBusy = true;
  startBtn.disabled = true;
  startBtn.textContent = isPreview ? '安全測試載入中...' : 'Birthday Mission 啟動中...';

  try {
    if (isPreview) {
      previewStage = 1;
      previewHints.clear();
      await loadPreviewStage();
    } else {
      const result = await callApi({ action: 'start', g: gameId });
      if (result.status !== 'ACTIVE') throw new Error('遊戲啟動狀態異常。');
      renderMission(result, false);
    }
  } catch (error) {
    showToast(error.message || '啟動失敗。');
    startBtn.disabled = false;
    startBtn.textContent = isPreview ? '開始安全測試' : '啟動生日任務';
  } finally {
    actionBusy = false;
  }
}

async function loadPreviewStage() {
  const result = await callApi({
    action: 'previewStage',
    g: gameId,
    preview: previewToken,
    stage: previewStage,
  });

  const savedHint = previewHints.get(previewStage);
  result.hintUnlocked = Boolean(savedHint);
  result.hint = savedHint || null;
  renderMission(result, true);
}

async function handleHint() {
  if (actionBusy || !currentMission) return;

  const answer = hintAnswerInput.value.trim();
  if (!answer) {
    showFeedback(hintFeedback, '請先輸入答案。', false);
    return;
  }

  actionBusy = true;
  hintSubmitBtn.disabled = true;
  hintSubmitBtn.textContent = '驗證中...';

  try {
    const payload = {
      action: isPreview ? 'previewHint' : 'hint',
      g: gameId,
      stage: currentMission.stage,
      answer,
    };
    if (isPreview) payload.preview = previewToken;

    const result = await callApi(payload);
    const success = result.status === 'HINT_UNLOCKED' || result.status === 'PREVIEW_HINT_UNLOCKED';

    if (success) {
      if (isPreview) previewHints.set(currentMission.stage, result.hint);
      currentMission.hintUnlocked = true;
      currentMission.hint = result.hint;
      revealHint(result.hint);
      showFeedback(hintFeedback, '答案正確，提示已解鎖。', true);
      return;
    }

    if (result.status === 'HINT_WRONG' || result.status === 'PREVIEW_HINT_WRONG') {
      showFeedback(hintFeedback, result.message || '答案不正確，再想一下。', false);
      hintSubmitBtn.disabled = false;
      hintSubmitBtn.textContent = '解鎖提示';
      return;
    }

    throw new Error('提示驗證狀態異常。');
  } catch (error) {
    showFeedback(hintFeedback, error.message || '提示驗證失敗。', false);
    hintSubmitBtn.disabled = false;
    hintSubmitBtn.textContent = '解鎖提示';
  } finally {
    actionBusy = false;
  }
}

async function handleUnlock() {
  if (actionBusy || !currentMission) return;

  const code = missionCodeInput.value.trim();
  if (!/^\d{4}$/.test(code)) {
    showFeedback(codeFeedback, '請輸入 Mission Card 上的 4 位數密碼。', false);
    return;
  }

  actionBusy = true;
  missionUnlockBtn.disabled = true;
  missionUnlockBtn.textContent = '驗證中...';

  try {
    const payload = {
      action: isPreview ? 'previewUnlock' : 'unlock',
      g: gameId,
      stage: currentMission.stage,
      code,
    };
    if (isPreview) payload.preview = previewToken;

    const result = await callApi(payload);

    if (result.status === 'PREVIEW_CODE_WRONG' || result.status === 'CODE_WRONG') {
      showFeedback(codeFeedback, result.message || 'Mission 密碼不正確。', false);
      resetUnlockButton();
      return;
    }

    if (result.status === 'PREVIEW_STAGE_COMPLETE') {
      showToast(`MISSION ${String(result.completedStage).padStart(2, '0')} COMPLETE`);
      previewStage = Number(result.nextStage);
      await loadPreviewStage();
      return;
    }

    if (result.status === 'PREVIEW_ALL_MISSIONS_COMPLETE') {
      renderPreviewComplete();
      return;
    }

    if (result.status === 'STAGE_COMPLETE') {
      showToast(`MISSION ${String(result.completedStage).padStart(2, '0')} COMPLETE`);
      await loadFormalState();
      return;
    }

    if (result.status === 'ALL_MISSIONS_COMPLETE') {
      renderAllComplete();
      return;
    }

    throw new Error('Mission 驗證狀態異常。');
  } catch (error) {
    showFeedback(codeFeedback, error.message || 'Mission 驗證失敗。', false);
    resetUnlockButton();
  } finally {
    actionBusy = false;
  }
}

async function handleRevealGift() {
  if (actionBusy) return;
  actionBusy = true;
  revealGiftBtn.disabled = true;
  revealGiftBtn.textContent = '正在揭曉生日禮物...';

  try {
    const result = await callApi({ action: 'revealGift', g: gameId });
    if (result.status !== 'GIFT_REVEALED') throw new Error('禮物揭曉狀態異常。');
    currentFinalResult = result;
    if (result.revealMethod === 'RESCUE') renderRescueSuccess(result);
    else renderGiftReveal(result);
  } catch (error) {
    showToast(error.message || '禮物揭曉失敗。');
    revealGiftBtn.disabled = false;
    revealGiftBtn.textContent = '揭曉我的生日禮物';
  } finally {
    actionBusy = false;
  }
}

async function handlePreviewRevealGift() {
  if (actionBusy) return;
  actionBusy = true;
  previewRevealBtn.disabled = true;
  previewRevealBtn.textContent = '測試中...';

  try {
    const result = await callApi({
      action: 'previewRevealGift',
      g: gameId,
      preview: previewToken,
    });
    if (result.status !== 'PREVIEW_GIFT_REVEAL_OK') throw new Error('Preview 禮物揭曉測試異常。');
    showScreen('previewGiftScreen');
  } catch (error) {
    showToast(error.message || '測試失敗。');
    previewRevealBtn.disabled = false;
    previewRevealBtn.textContent = '測試禮物揭曉';
  } finally {
    actionBusy = false;
  }
}

async function handleRescue() {
  if (actionBusy) return;
  actionBusy = true;
  rescueBtn.disabled = true;
  rescueBtn.textContent = '確認中...';

  try {
    if (isPreview) {
      const result = await callApi({
        action: 'previewRescue',
        g: gameId,
        preview: previewToken,
      });
      if (result.status !== 'PREVIEW_RESCUE_OK') throw new Error('救援測試異常。');
      rescueStatus.textContent = '✓ 人道救援功能測試正常';
      rescueBtn.textContent = '測試完成';
      showToast('人道救援測試成功，不會顯示正式禮物位置');
      return;
    }

    const result = await callApi({ action: 'rescue', g: gameId });

    if (result.status === 'RESCUE_LOCKED') {
      rescueStatus.textContent = '尚未到達人道救援時間';
      rescueBtn.textContent = '尚未開放';
      startRescueTimer(result.rescueAt);
      return;
    }

    if (result.status === 'RESCUE_SUCCESS') {
      currentFinalResult = {
        ...result,
        revealMethod: 'RESCUE',
      };
      renderRescueSuccess(currentFinalResult);
      return;
    }

    throw new Error('人道救援狀態異常。');
  } catch (error) {
    showToast(error.message || '人道救援失敗。');
    rescueBtn.disabled = false;
    rescueBtn.textContent = isPreview ? '測試人道救援' : '啟動人道救援';
  } finally {
    actionBusy = false;
  }
}

function openFormalReport() {
  if (!currentFinalResult || !currentFinalResult.report) {
    showToast('任務報告讀取失敗，請重新整理頁面。');
    return;
  }
  renderReport(currentFinalResult.report, false);
}

function openPreviewReport() {
  try {
    const requiredIds = [
      'reportScreen',
      'reportMissions',
      'reportTime',
      'reportPeek',
      'reportHints',
      'reportWrong',
      'reportCodeWrong',
      'reportModeBadge',
      'reportIntro',
      'previewReportNote',
      'unlockCardBtn',
      'previewCardBtn',
    ];

    const missing = requiredIds.filter(id => !document.getElementById(id));

    if (missing.length) {
      throw new Error('Phase 07 HTML 缺少：' + missing.join(', '));
    }

    renderReport({
      missionsCompleted: previewTotalStage,
      totalMissions: previewTotalStage,
      elapsedMinutes: null,
      peekCount: null,
      hintUsed: null,
      hintWrong: null,
      codeWrong: null,
      rescueUsed: false,
      completionMethod: 'PREVIEW',
    }, true);

  } catch (error) {
    console.error('Preview Report Error:', error);
    alert('Preview 任務報告錯誤：\n' + (error.message || String(error)));
  }
}

function renderReport(report, preview) {
  const total = Number(report?.totalMissions || 0);
  const completed = Number(report?.missionsCompleted || 0);

  document.getElementById('reportMissions').textContent = total ? `${completed}/${total}` : '—';
  document.getElementById('reportTime').textContent = preview ? '—' : formatElapsed(report?.elapsedMinutes);
  document.getElementById('reportPeek').textContent = preview ? '—' : String(report?.peekCount ?? 0);
  document.getElementById('reportHints').textContent = preview ? '—' : String(report?.hintUsed ?? 0);
  document.getElementById('reportWrong').textContent = preview ? '—' : String(report?.hintWrong ?? 0);
  document.getElementById('reportCodeWrong').textContent = preview ? '—' : String(report?.codeWrong ?? 0);

  const badge = document.getElementById('reportModeBadge');
  const intro = document.getElementById('reportIntro');
  const note = document.getElementById('previewReportNote');

  badge.classList.remove('rescue');

  if (preview) {
    badge.textContent = 'PREVIEW REPORT';
    intro.textContent = '這是購買人驗收用的報告畫面。正式遊戲才會記錄實際次數與破關時間。';
    note.hidden = false;
    unlockCardBtn.hidden = true;
    previewCardBtn.hidden = false;
  } else if (report?.rescueUsed || report?.completionMethod === 'RESCUE') {
    badge.textContent = 'HUMANITARIAN RESCUE';
    badge.classList.add('rescue');
    intro.textContent = '雖然最後使用了人道救援，但今天的 Birthday Mission 還是留下了一份專屬紀錄。';
    note.hidden = true;
    unlockCardBtn.hidden = false;
    previewCardBtn.hidden = true;
  } else {
    badge.textContent = 'MISSION COMPLETE';
    intro.textContent = '今天這場 Birthday Mission，留下了一些只屬於你的破關紀錄。';
    note.hidden = true;
    unlockCardBtn.hidden = false;
    previewCardBtn.hidden = true;
  }

  showScreen('reportScreen');
}

async function handleUnlockPermanentCard() {
  if (actionBusy) return;
  actionBusy = true;
  unlockCardBtn.disabled = true;
  unlockCardBtn.textContent = '正在解鎖生日卡...';

  try {
    const result = await callApi({ action: 'complete', g: gameId });
    if (result.status !== 'CARD_UNLOCKED' && result.status !== 'CARD') {
      throw new Error('生日卡解鎖狀態異常。');
    }
    renderBirthdayCard(result, false);
  } catch (error) {
    showToast(error.message || '生日卡解鎖失敗。');
    unlockCardBtn.disabled = false;
    unlockCardBtn.textContent = '收下這張生日卡';
  } finally {
    actionBusy = false;
  }
}

async function handlePreviewCard() {
  if (actionBusy) return;
  actionBusy = true;
  previewCardBtn.disabled = true;
  previewCardBtn.textContent = '載入生日卡...';

  try {
    const result = await callApi({
      action: 'previewCard',
      g: gameId,
      preview: previewToken,
    });
    if (result.status !== 'PREVIEW_CARD') throw new Error('Preview 生日卡讀取異常。');
    renderBirthdayCard(result, true);
  } catch (error) {
    showToast(error.message || '生日卡預覽失敗。');
    previewCardBtn.disabled = false;
    previewCardBtn.textContent = '預覽永久生日卡';
  } finally {
    actionBusy = false;
  }
}

function renderBirthdayCard(data, preview) {
  const card = data?.card || {};
  const cardEl = document.getElementById('birthdayCard');
  const photoWrap = document.getElementById('cardPhotoWrap');
  const photo = document.getElementById('cardPhoto');

  cardEl.className = `birthday-card ${getTemplateClass(card.template)}`;
  document.getElementById('cardDate').textContent = formatDisplayDate(data?.birthdayDate);
  document.getElementById('cardSubtitle').textContent = card.subtitle || '';
  document.getElementById('cardTitle').textContent = card.title || 'HAPPY BIRTHDAY';
  document.getElementById('cardMessage').textContent = card.message || '';
  document.getElementById('cardSignature').textContent = card.signature || '';

  if (card.photoUrl) {
    photoWrap.hidden = false;
    photo.src = card.photoUrl;
    photo.onerror = () => {
      photoWrap.hidden = true;
    };
  } else {
    photoWrap.hidden = true;
    photo.removeAttribute('src');
  }

  const heading = document.getElementById('permanentCardHeading');
  const text = document.getElementById('permanentCardText');

  if (preview) {
    heading.textContent = '永久生日卡預覽正常';
    text.textContent = '這是安全測試模式。重新整理後不會改變正式 Birthday Mission 的任何進度。';
    previewCardRestartBtn.hidden = false;
  } else {
    heading.textContent = '這張生日卡已永久解鎖';
    text.textContent = '以後再次感應同一張 NFC，就會直接回到這張生日卡，不需要重新闖關。';
    previewCardRestartBtn.hidden = true;
  }

  showScreen('birthdayCardScreen');
}

function getTemplateClass(template) {
  switch (String(template || '').trim()) {
    case '奶油白': return 'template-cream';
    case '浪漫暖色': return 'template-warm';
    case '精品黑':
    default: return 'template-black';
  }
}

function formatDisplayDate(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : text || 'BIRTHDAY';
}

function formatElapsed(value) {
  if (value === null || value === undefined || value === '') return '—';
  const minutes = Math.max(0, Number(value) || 0);
  if (minutes < 1) return '<1 分';
  if (minutes < 60) return `${minutes} 分`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}時${rest}分` : `${hours} 小時`;
}

function renderReady(data, preview) {
  document.getElementById('readyNickname').textContent = data.nickname || 'PLAYER';
  document.getElementById('readyMissionCount').textContent = `${data.totalStage} MISSION${Number(data.totalStage) > 1 ? 'S' : ''}`;
  startBtn.disabled = false;
  startBtn.textContent = preview ? '開始安全測試' : '啟動生日任務';
  showScreen('readyScreen');
}

function renderMission(data, preview) {
  clearInterval(rescueTimer);
  const stage = Number(data.stage);
  const total = Number(data.totalStage);

  currentMission = { ...data, stage, totalStage: total };
  document.getElementById('missionTitle').textContent = `MISSION ${String(stage).padStart(2, '0')}`;
  document.getElementById('missionCounter').textContent = `${stage} / ${total}`;
  document.getElementById('missionClue').textContent = data.clue || '—';
  document.getElementById('missionProgress').style.width = `${(stage / total) * 100}%`;
  hintQuestion.textContent = data.hintQuestion || '—';

  resetMissionInputs();
  if (data.hintUnlocked && data.hint) revealHint(data.hint);
  configureRescue(data, preview);
  showScreen('missionScreen');
}

function resetMissionInputs() {
  hintAnswerInput.value = '';
  hintAnswerInput.disabled = false;
  missionCodeInput.value = '';
  hintFeedback.hidden = true;
  hintFeedback.className = 'action-feedback';
  codeFeedback.hidden = true;
  codeFeedback.className = 'action-feedback';
  hintReveal.hidden = true;
  hintSubmitBtn.disabled = false;
  hintSubmitBtn.textContent = '解鎖提示';
  missionUnlockBtn.disabled = false;
  missionUnlockBtn.textContent = '驗證 Mission Card';
}

function revealHint(text) {
  hintText.textContent = text || '—';
  hintReveal.hidden = false;
  hintSubmitBtn.disabled = true;
  hintSubmitBtn.textContent = '提示已解鎖';
  hintAnswerInput.disabled = true;
}

function showFeedback(element, message, success) {
  element.textContent = message;
  element.hidden = false;
  element.className = `action-feedback ${success ? 'success' : 'error'}`;
}

function configureRescue(data, preview) {
  clearInterval(rescueTimer);

  if (preview) {
    rescueTitle.textContent = '人道救援・測試';
    rescueDescription.textContent = '可測試救援功能，但 Preview 不會公開真正的生日禮物位置。';
    rescueStatus.textContent = '安全測試模式';
    rescueBtn.disabled = false;
    rescueBtn.textContent = '測試人道救援';
    return;
  }

  rescueTitle.textContent = '人道救援';
  rescueDescription.textContent = '如果真的完全找不到，到指定時間後可以選擇直接揭曉禮物位置。';

  if (data.rescueAvailable) {
    rescueStatus.textContent = '救援已開放';
    rescueBtn.disabled = false;
    rescueBtn.textContent = '啟動人道救援';
    return;
  }

  rescueBtn.disabled = true;
  rescueBtn.textContent = '尚未開放';
  if (data.rescueAt) startRescueTimer(data.rescueAt);
}

function startRescueTimer(rescueAt) {
  clearInterval(rescueTimer);
  const target = new Date(rescueAt);

  const update = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(rescueTimer);
      rescueStatus.textContent = '救援已開放';
      rescueBtn.disabled = false;
      rescueBtn.textContent = '啟動人道救援';
      return;
    }

    const totalMinutes = Math.ceil(diff / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    rescueStatus.textContent = hours > 0 ? `約 ${hours} 小時 ${minutes} 分鐘後開放` : `約 ${minutes} 分鐘後開放`;
  };

  update();
  rescueTimer = setInterval(update, 30000);
}

function renderAllComplete() {
  clearInterval(rescueTimer);
  currentMission = null;
  revealGiftBtn.disabled = false;
  revealGiftBtn.textContent = '揭曉我的生日禮物';
  showScreen('allCompleteScreen');
}

function renderPreviewComplete() {
  clearInterval(rescueTimer);
  currentMission = null;
  previewRevealBtn.disabled = false;
  previewRevealBtn.textContent = '測試禮物揭曉';
  showScreen('previewCompleteScreen');
}

function renderGiftReveal(data) {
  clearInterval(rescueTimer);
  currentFinalResult = data;
  document.getElementById('giftLocation').textContent = data.giftLocation || '—';
  document.getElementById('giftBlessing').textContent = data.completionBlessing || '';
  showScreen('giftRevealScreen');
}

function renderRescueSuccess(data) {
  clearInterval(rescueTimer);
  currentFinalResult = data;
  document.getElementById('rescueGiftLocation').textContent = data.giftLocation || '—';
  document.getElementById('rescueBlessing').textContent = data.completionBlessing || '';
  showScreen('rescueSuccessScreen');
}

function restartPreview() {
  window.location.reload();
}

function renderLocked(data) {
  document.getElementById('lockedNickname').textContent = data.nickname || '壽星';
  showScreen('lockedScreen');
  startCountdown(data.unlockAt);
}

function startCountdown(targetString) {
  clearInterval(countdownTimer);
  const target = new Date(targetString);

  const update = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(countdownTimer);
      loadFormalState();
      return;
    }

    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    setCountdown('countDays', days);
    setCountdown('countHours', hours);
    setCountdown('countMinutes', minutes);
    setCountdown('countSeconds', secs);
  };

  update();
  countdownTimer = setInterval(update, 1000);
}

function setCountdown(id, value) {
  document.getElementById(id).textContent = String(value).padStart(2, '0');
}

function resetUnlockButton() {
  missionUnlockBtn.disabled = false;
  missionUnlockBtn.textContent = '驗證 Mission Card';
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showError(message) {
  clearInterval(countdownTimer);
  clearInterval(rescueTimer);
  document.getElementById('errorMessage').textContent = message;
  showScreen('errorScreen');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
