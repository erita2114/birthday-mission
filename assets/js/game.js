const BM_GAME = Object.freeze({ PREVIEW_PARAM: 'preview' });

const MODE_PROFILES = Object.freeze({
  '暖心模式': {
    key: 'heart',
    badgeCode: 'HEART MODE',
    badgeLabel: '暖心模式',
    tagline: '有人把想說的話，藏進了每一關。',
    lockedTitle: '還沒到拆開驚喜的時間。',
    lockedDescription: '{name} 的 Birthday Mission 還在替今天保守秘密。',
    readyTitle: '今天的生日禮物，要你親手一步一步找到。',
    readyDescription: '每一張 Mission Card 都藏著一點心意。慢慢找，不用急，最後的驚喜會等你。',
    startButton: '開始尋找今天的驚喜',
    previewStartButton: '開始暖心模式測試',
    missionEyebrow: 'A LITTLE CLOSER',
    hintEyebrow: 'A LITTLE HELP',
    hintHeading: '需要一點小提示嗎？',
    hintDescription: '回答一個屬於你們的問題，答對後會多得到一點方向。',
    hintButton: '解鎖溫馨提示',
    hintUnlockedButton: '提示已經送到你手上',
    hintSuccess: '答對了。這個提示，希望能讓你再靠近一點。',
    cardEyebrow: 'FOUND SOMETHING?',
    cardHeading: '找到實體任務卡了嗎？',
    cardDescription: '輸入卡片上的 4 位數密碼，繼續靠近今天為你準備的驚喜。',
    unlockButton: '確認這張 Mission Card',
    codePrompt: '請輸入 Mission Card 上的 4 位數密碼。',
    rescueTitle: '需要偷偷幫你一下嗎？',
    rescueDescription: '如果真的找不到，到指定時間後可以直接得到最後的方向。',
    rescueButton: '請給我最後一點幫助',
    rescueLockedButton: '還要再努力一下',
    rescueAvailable: '最後的幫助已經準備好了',
    rescueLockedStatus: '救援還沒開放，再找找看',
    allTitle: '你把所有藏起來的心意都找到了。',
    allDescription: '一路藏起來的線索都被你找到。最後的生日驚喜，現在交給你親手揭曉。',
    finalTitle: '最後一份心意已經解鎖',
    finalDescription: '準備好，就看看有人最後想把你帶到哪裡。',
    revealButton: '揭曉最後的生日驚喜',
    giftTitle: '終於找到你了。',
    giftIntro: '繞了這麼一大圈，是因為有人覺得，這份生日驚喜值得你親手找到。',
    rescueSuccessTitle: '好啦，最後幫你一次。',
    rescueSuccessDescription: '有些驚喜不用一定逞強找到，重要的是最後還是來到了這裡。',
    reportTitle: '你的生日尋寶紀錄',
    reportIntro: '今天每一次找到線索、每一次卡住，都變成了這場生日驚喜的一部分。',
    reportRescueIntro: '雖然最後借了一點幫助，但前面走過的每一步還是都算數。',
    reportButton: '看看今天留下的紀錄',
    cardButton: '收下這張生日卡',
    ceremony: {
      start: { kicker: 'A BIRTHDAY SECRET', title: 'ACCESS GRANTED', subtitle: 'YOUR SURPRISE STARTS HERE' },
      stage: { kicker: 'ONE STEP CLOSER', title: 'MISSION {stage} COMPLETE', subtitle: 'THE SURPRISE IS STILL WAITING' },
      final: { kicker: 'EVERY CLUE FOUND', title: 'ALL MISSIONS COMPLETE', subtitle: 'ONE LAST SURPRISE REMAINS' },
      gift: { kicker: 'JUST FOR YOU', title: 'REWARD UNLOCKED', subtitle: 'YOUR BIRTHDAY SURPRISE IS READY' },
      rescue: { kicker: 'A LITTLE HELP', title: 'RESCUE ACCEPTED', subtitle: 'THE FINAL SURPRISE IS NOW YOURS' },
      memory: { kicker: 'BIRTHDAY MEMORY', title: 'MEMORY KEPT', subtitle: 'THIS ONE STAYS WITH YOU' },
    },
  },

  '嘴砲模式': {
    key: 'roast',
    badgeCode: 'ROAST MODE',
    badgeLabel: '嘴砲模式',
    tagline: '今天生日，但不代表會對你客氣。',
    lockedTitle: '偷跑被抓到了。',
    lockedDescription: '{name}，生日都還沒到就先來偷看，你是真的很急。',
    readyTitle: '生日禮物有準備，但想白拿？想得美。',
    readyDescription: '有人花時間藏了幾張 Mission Card。你今天唯一的工作，就是撐到最後不要太早求救。',
    startButton: '好啦，我來闖就是了',
    previewStartButton: '開始嘴砲模式測試',
    missionEyebrow: 'GOOD LUCK, GENIUS',
    hintEyebrow: 'STUCK ALREADY?',
    hintHeading: '卡住了？這麼快？',
    hintDescription: '回答一題換提示。放心，系統會盡量假裝沒看到你求救。',
    hintButton: '我承認我需要提示',
    hintUnlockedButton: '好啦，提示給你了',
    hintSuccess: '居然答對了。提示給你，別再說系統沒幫忙。',
    cardEyebrow: 'FOUR DIGITS. PLEASE.',
    cardHeading: '終於找到卡片了？',
    cardDescription: '四個數字而已。深呼吸，輸對就讓你進下一關。',
    unlockButton: '驗證，我應該沒打錯',
    codePrompt: '先把 4 位數打完整，不要連格式都輸。',
    rescueTitle: '真的不行了？',
    rescueDescription: '時間到了可以直接求救。系統不會笑你太久。',
    rescueButton: '好啦，我投降',
    rescueLockedButton: '現在投降太早了',
    rescueAvailable: '求救按鈕已經替你開好了',
    rescueLockedStatus: '還不能投降，繼續找',
    allTitle: '居然真的全部找到了。',
    allDescription: '老實說，有點出乎意料。好啦，你有資格看最後的生日禮物了。',
    finalTitle: '恭喜，你沒有半路放棄',
    finalDescription: '最後一步：親手把今天一直不肯直接給你的驚喜揭開。',
    revealButton: '好啦，把禮物交出來',
    giftTitle: '可以，算你厲害。',
    giftIntro: '折騰你這麼久不是沒有原因。下面就是今天一直不肯直接給你的生日驚喜。',
    rescueSuccessTitle: '我就知道你會按這顆。',
    rescueSuccessDescription: '沒關係，至少你很誠實。生日禮物還是給你。',
    reportTitle: '今天到底多會出包',
    reportIntro: '系統非常敬業地記下了你的努力，也順便記下了你今天有多常卡住。',
    reportRescueIntro: '最後還是按了救援。沒事，這份紀錄會幫你保密——大概。',
    reportButton: '看看我今天多荒謬',
    cardButton: '好啦，生日卡我收下',
    ceremony: {
      start: { kicker: 'LET THE ROAST BEGIN', title: 'GOOD LUCK', subtitle: 'TRY NOT TO NEED RESCUE TOO SOON' },
      stage: { kicker: 'SURPRISINGLY VALID', title: 'MISSION {stage} COMPLETE', subtitle: 'YOU MAY CONTINUE' },
      final: { kicker: 'UNEXPECTED RESULT', title: 'ALL MISSIONS COMPLETE', subtitle: 'OKAY, YOU EARNED THIS' },
      gift: { kicker: 'FINE, YOU WIN', title: 'REWARD UNLOCKED', subtitle: 'THE GIFT CAN’T HIDE ANYMORE' },
      rescue: { kicker: 'WE SAW THIS COMING', title: 'RESCUE ACCEPTED', subtitle: 'NO JUDGMENT. ALMOST.' },
      memory: { kicker: 'FINE, KEEP THIS', title: 'MEMORY ARCHIVED', subtitle: 'YOU EARNED A SOUVENIR' },
    },
  },

  '地獄模式': {
    key: 'hell',
    badgeCode: 'HELL MODE',
    badgeLabel: '地獄模式',
    tagline: '錯一步沒關係，系統會記得。',
    lockedTitle: '未達授權時間。',
    lockedDescription: '{name} 的挑戰尚未開放。提前存取已被系統記錄。',
    readyTitle: '歡迎進入生日地獄。',
    readyDescription: '完成全部任務才有資格取得最終獎勵。提示、錯誤與救援都會留下紀錄。',
    startButton: '進入地獄挑戰',
    previewStartButton: '開始地獄模式測試',
    missionEyebrow: 'CLEARANCE REQUIRED',
    hintEyebrow: 'ASSISTANCE REQUEST',
    hintHeading: '需要降低難度？',
    hintDescription: '通過提示題驗證，系統才會釋出額外線索。',
    hintButton: '申請額外線索',
    hintUnlockedButton: '額外線索已核准',
    hintSuccess: '驗證通過。額外線索已釋出。',
    cardEyebrow: 'AUTHORIZATION CODE',
    cardHeading: '取得實體任務卡？',
    cardDescription: '輸入 4 位數授權碼。驗證失敗不會前進。',
    unlockButton: '驗證授權碼',
    codePrompt: '請輸入完整 4 位數授權碼。',
    rescueTitle: '緊急終止協議',
    rescueDescription: '僅在指定時間後開放。啟動後將直接釋出最終獎勵位置。',
    rescueButton: '啟動緊急救援',
    rescueLockedButton: '救援協議鎖定',
    rescueAvailable: '緊急救援協議已開放',
    rescueLockedStatus: '救援協議尚未開放',
    allTitle: '所有關卡已清除。',
    allDescription: '挑戰紀錄確認完成。最終生日獎勵已解除封鎖。',
    finalTitle: 'FINAL CLEARANCE GRANTED',
    finalDescription: '最後確認後，系統將公開生日禮物位置。',
    revealButton: '解除最終獎勵封鎖',
    giftTitle: 'CLEARANCE COMPLETE.',
    giftIntro: '你已完成所有驗證。以下內容為本次 Birthday Mission 最終獎勵。',
    rescueSuccessTitle: '救援協議已執行。',
    rescueSuccessDescription: '挑戰提前終止。最終生日獎勵位置已釋出。',
    reportTitle: '挑戰紀錄報告',
    reportIntro: '以下為本次挑戰留下的完整任務紀錄。',
    reportRescueIntro: '本次挑戰以救援協議結束。終止前的所有紀錄仍保留。',
    reportButton: '檢視挑戰紀錄',
    cardButton: '封存本次生日任務',
    ceremony: {
      start: { kicker: 'HELL PROTOCOL', title: 'CLEARANCE GRANTED', subtitle: 'NO TURNING BACK' },
      stage: { kicker: 'CHECKPOINT CLEARED', title: 'MISSION {stage} VERIFIED', subtitle: 'NEXT TRIAL UNLOCKED' },
      final: { kicker: 'FINAL CLEARANCE', title: 'ALL MISSIONS CLEARED', subtitle: 'REWARD ACCESS AUTHORIZED' },
      gift: { kicker: 'AUTHORIZED', title: 'REWARD DECRYPTED', subtitle: 'FINAL LOCATION RELEASED' },
      rescue: { kicker: 'EMERGENCY OVERRIDE', title: 'RESCUE PROTOCOL USED', subtitle: 'CHALLENGE TERMINATED EARLY' },
      memory: { kicker: 'ARCHIVE SEALED', title: 'MEMORY SECURED', subtitle: 'PERMANENT ACCESS STORED' },
    },
  },
});


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
let ceremonyTimer = null;
let currentGameMode = '暖心模式';
let modeConfirmed = false;

const previewBanner = document.getElementById('previewBanner');
const modeBadge = document.getElementById('modeBadge');
const modeBadgeCode = document.getElementById('modeBadgeCode');
const modeBadgeLabel = document.getElementById('modeBadgeLabel');
const modeBadgeTagline = document.getElementById('modeBadgeTagline');
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
const ceremonyOverlay = document.getElementById('ceremonyOverlay');
const ceremonyKicker = document.getElementById('ceremonyKicker');
const ceremonyTitle = document.getElementById('ceremonyTitle');
const ceremonySubtitle = document.getElementById('ceremonySubtitle');
const reduceMotion = Boolean(
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

init();

async function init() {
  restoreGameMode_();

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
  previewReportBtn.addEventListener('click', openPreviewReport);
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
  syncGameMode_(result);

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

  syncGameMode_(result);

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
      await playModeCeremony_('start', 900);
      await loadPreviewStage();
    } else {
      const result = await callApi({ action: 'start', g: gameId });
      if (result.status !== 'ACTIVE') throw new Error('遊戲啟動狀態異常。');
      syncGameMode_(result);
      await playModeCeremony_('start', 900);
      renderMission(result, false);
    }
  } catch (error) {
    showToast(error.message || '啟動失敗。');
    startBtn.disabled = false;
    startBtn.textContent = isPreview ? getModeProfile_().previewStartButton : getModeProfile_().startButton;
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
    showFeedback(hintFeedback, getModeProfile_().hintButton === '申請額外線索' ? '請先輸入驗證答案。' : '請先輸入答案。', false);
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
      showFeedback(hintFeedback, getModeProfile_().hintSuccess, true);
      return;
    }

    if (result.status === 'HINT_WRONG' || result.status === 'PREVIEW_HINT_WRONG') {
      showFeedback(hintFeedback, result.message || '答案不正確，再想一下。', false);
      hintSubmitBtn.disabled = false;
      hintSubmitBtn.textContent = getModeProfile_().hintButton;
      return;
    }

    throw new Error('提示驗證狀態異常。');
  } catch (error) {
    showFeedback(hintFeedback, error.message || '提示驗證失敗。', false);
    hintSubmitBtn.disabled = false;
    hintSubmitBtn.textContent = getModeProfile_().hintButton;
  } finally {
    actionBusy = false;
  }
}

async function handleUnlock() {
  if (actionBusy || !currentMission) return;

  const code = missionCodeInput.value.trim();
  if (!/^\d{4}$/.test(code)) {
    showFeedback(codeFeedback, getModeProfile_().codePrompt, false);
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
      await playModeCeremony_('stage', 820, result.completedStage);
      previewStage = Number(result.nextStage);
      await loadPreviewStage();
      return;
    }

    if (result.status === 'PREVIEW_ALL_MISSIONS_COMPLETE') {
      await playModeCeremony_('final', 1150);
      renderPreviewComplete();
      return;
    }

    if (result.status === 'STAGE_COMPLETE') {
      await playModeCeremony_('stage', 820, result.completedStage);
      await loadFormalState();
      return;
    }

    if (result.status === 'ALL_MISSIONS_COMPLETE') {
      await playModeCeremony_('final', 1150);
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
    await playModeCeremony_(
      result.revealMethod === 'RESCUE' ? 'rescue' : 'gift',
      1250
    );
    if (result.revealMethod === 'RESCUE') renderRescueSuccess(result);
    else renderGiftReveal(result);
  } catch (error) {
    showToast(error.message || '禮物揭曉失敗。');
    revealGiftBtn.disabled = false;
    revealGiftBtn.textContent = getModeProfile_().revealButton;
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
    await playModeCeremony_('gift', 900);
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
      await playModeCeremony_('rescue', 1050);
      renderRescueSuccess(currentFinalResult);
      return;
    }

    throw new Error('人道救援狀態異常。');
  } catch (error) {
    showToast(error.message || '人道救援失敗。');
    rescueBtn.disabled = false;
    rescueBtn.textContent = isPreview ? `測試｜${getModeProfile_().rescueButton}` : getModeProfile_().rescueButton;
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

  const profile = getModeProfile_();
  document.getElementById('reportTitle').textContent = profile.reportTitle;

  if (preview) {
    badge.textContent = 'PREVIEW REPORT';
    intro.textContent = `這是「${profile.badgeLabel}」的驗收報告畫面。正式遊戲才會記錄實際次數與破關時間。`;
    note.hidden = false;
    unlockCardBtn.hidden = true;
    previewCardBtn.hidden = false;
  } else if (report?.rescueUsed || report?.completionMethod === 'RESCUE') {
    badge.textContent = 'HUMANITARIAN RESCUE';
    badge.classList.add('rescue');
    intro.textContent = profile.reportRescueIntro;
    note.hidden = true;
    unlockCardBtn.hidden = false;
    previewCardBtn.hidden = true;
  } else {
    badge.textContent = 'MISSION COMPLETE';
    intro.textContent = profile.reportIntro;
    note.hidden = true;
    unlockCardBtn.hidden = false;
    previewCardBtn.hidden = true;
  }

  normalReportBtn.textContent = profile.reportButton;
  rescueReportBtn.textContent = profile.reportButton;
  unlockCardBtn.textContent = profile.cardButton;

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
    await playModeCeremony_('memory', 1050);
    renderBirthdayCard(result, false);
  } catch (error) {
    showToast(error.message || '生日卡解鎖失敗。');
    unlockCardBtn.disabled = false;
    unlockCardBtn.textContent = getModeProfile_().cardButton;
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
    await playModeCeremony_('memory', 760);
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

  loadBirthdayCardPhoto_(
    photo,
    photoWrap,
    card.photoDataUrl || card.photoUrl
  );

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

function loadBirthdayCardPhoto_(photo, photoWrap, rawUrl) {
  const sourceUrl = String(rawUrl || '').trim();

  photo.onload = null;
  photo.onerror = null;
  photo.removeAttribute('src');
  photoWrap.hidden = true;
  photoWrap.classList.remove('photo-load-error');

  if (!sourceUrl) {
    return;
  }

  const candidates = buildBirthdayPhotoCandidates_(sourceUrl);
  let index = 0;

  const tryNext = () => {
    if (index >= candidates.length) {
      photo.onerror = null;
      photo.removeAttribute('src');
      photoWrap.hidden = false;
      photoWrap.classList.add('photo-load-error');
      return;
    }

    photoWrap.hidden = false;
    photoWrap.classList.remove('photo-load-error');

    photo.onload = () => {
      photoWrap.hidden = false;
      photoWrap.classList.remove('photo-load-error');
    };

    photo.onerror = () => {
      index += 1;
      tryNext();
    };

    photo.src = candidates[index];
  };

  tryNext();
}

function buildBirthdayPhotoCandidates_(rawUrl) {
  const original = String(rawUrl || '').trim();
  const candidates = [];

  const pushUnique = value => {
    const url = String(value || '').trim();
    if (url && !candidates.includes(url)) {
      candidates.push(url);
    }
  };

  const driveInfo = extractDrivePhotoInfo_(original);

  if (driveInfo.fileId) {
    let thumbnail =
      'https://drive.google.com/thumbnail?id=' +
      encodeURIComponent(driveInfo.fileId) +
      '&sz=w1600';

    if (driveInfo.resourceKey) {
      thumbnail +=
        '&resourcekey=' +
        encodeURIComponent(driveInfo.resourceKey);
    }

    pushUnique(thumbnail);

    let uc =
      'https://drive.google.com/uc?export=view&id=' +
      encodeURIComponent(driveInfo.fileId);

    if (driveInfo.resourceKey) {
      uc +=
        '&resourcekey=' +
        encodeURIComponent(driveInfo.resourceKey);
    }

    pushUnique(uc);

    pushUnique(
      'https://lh3.googleusercontent.com/d/' +
      encodeURIComponent(driveInfo.fileId) +
      '=w1600'
    );
  }

  pushUnique(original);

  return candidates;
}

function extractDrivePhotoInfo_(url) {
  const text = String(url || '').trim();
  let fileId = '';
  let resourceKey = '';

  try {
    const parsed = new URL(text);
    resourceKey = parsed.searchParams.get('resourcekey') || '';

    if (
      parsed.hostname === 'drive.google.com' ||
      parsed.hostname.endsWith('.googleusercontent.com')
    ) {
      fileId =
        parsed.searchParams.get('id') ||
        '';

      if (!fileId) {
        const match =
          parsed.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);

        if (match) {
          fileId = match[1];
        }
      }
    }
  } catch (ignore) {
    const idMatch =
      text.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (idMatch) {
      fileId = idMatch[1];
    }

    const resourceMatch =
      text.match(/[?&]resourcekey=([^&]+)/);

    if (resourceMatch) {
      resourceKey = decodeURIComponent(resourceMatch[1]);
    }
  }

  return {
    fileId,
    resourceKey,
  };
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
  syncGameMode_(data);
  const profile = getModeProfile_();

  document.getElementById('readyNickname').textContent = data.nickname || 'PLAYER';
  document.getElementById('readyMissionCount').textContent = `${data.totalStage} MISSION${Number(data.totalStage) > 1 ? 'S' : ''}`;
  document.getElementById('readyTitle').textContent = profile.readyTitle;
  document.getElementById('readyDescription').textContent = profile.readyDescription;

  startBtn.disabled = false;
  startBtn.textContent = preview ? profile.previewStartButton : profile.startButton;
  showScreen('readyScreen');
}

function renderMission(data, preview) {
  clearInterval(rescueTimer);
  syncGameMode_(data);

  const stage = Number(data.stage);
  const total = Number(data.totalStage);
  const profile = getModeProfile_();

  currentMission = { ...data, stage, totalStage: total };
  document.getElementById('missionEyebrow').textContent = profile.missionEyebrow;
  document.getElementById('hintEyebrow').textContent = profile.hintEyebrow;
  document.getElementById('hintHeading').textContent = profile.hintHeading;
  document.getElementById('hintDescription').textContent = profile.hintDescription;
  document.getElementById('cardEyebrow').textContent = profile.cardEyebrow;
  document.getElementById('missionCardHeading').textContent = profile.cardHeading;
  document.getElementById('missionCardDescription').textContent = profile.cardDescription;

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
  const profile = getModeProfile_();

  hintSubmitBtn.disabled = false;
  hintSubmitBtn.textContent = profile.hintButton;
  missionUnlockBtn.disabled = false;
  missionUnlockBtn.textContent = profile.unlockButton;
}

function revealHint(text) {
  hintText.textContent = text || '—';
  hintReveal.hidden = false;
  hintSubmitBtn.disabled = true;
  hintSubmitBtn.textContent = getModeProfile_().hintUnlockedButton;
  hintAnswerInput.disabled = true;
}

function showFeedback(element, message, success) {
  element.textContent = message;
  element.hidden = false;
  element.className = `action-feedback ${success ? 'success' : 'error'}`;
}

function configureRescue(data, preview) {
  clearInterval(rescueTimer);
  const profile = getModeProfile_();

  rescueTitle.textContent = preview
    ? `${profile.rescueTitle}・測試`
    : profile.rescueTitle;

  rescueDescription.textContent = preview
    ? `${profile.rescueDescription} Preview 不會公開真正的生日禮物位置。`
    : profile.rescueDescription;

  if (preview) {
    rescueStatus.textContent = '安全測試模式';
    rescueBtn.disabled = false;
    rescueBtn.textContent = `測試｜${profile.rescueButton}`;
    return;
  }

  if (data.rescueAvailable) {
    rescueStatus.textContent = profile.rescueAvailable;
    rescueBtn.disabled = false;
    rescueBtn.textContent = profile.rescueButton;
    return;
  }

  rescueBtn.disabled = true;
  rescueBtn.textContent = profile.rescueLockedButton;
  if (data.rescueAt) startRescueTimer(data.rescueAt);
}

function startRescueTimer(rescueAt) {
  clearInterval(rescueTimer);
  const target = new Date(rescueAt);

  const update = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(rescueTimer);
      const profile = getModeProfile_();
      rescueStatus.textContent = profile.rescueAvailable;
      rescueBtn.disabled = false;
      rescueBtn.textContent = profile.rescueButton;
      return;
    }

    const totalMinutes = Math.ceil(diff / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const base = hours > 0 ? `約 ${hours} 小時 ${minutes} 分鐘後開放` : `約 ${minutes} 分鐘後開放`;
    rescueStatus.textContent = `${getModeProfile_().rescueLockedStatus}｜${base}`;
  };

  update();
  rescueTimer = setInterval(update, 30000);
}

function renderAllComplete() {
  clearInterval(rescueTimer);
  currentMission = null;

  const profile = getModeProfile_();
  document.getElementById('allCompleteTitle').textContent = profile.allTitle;
  document.getElementById('allCompleteDescription').textContent = profile.allDescription;
  document.getElementById('finalAccessTitle').textContent = profile.finalTitle;
  document.getElementById('finalAccessDescription').textContent = profile.finalDescription;

  revealGiftBtn.disabled = false;
  revealGiftBtn.textContent = profile.revealButton;
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

  const profile = getModeProfile_();
  document.getElementById('giftRevealTitle').textContent = profile.giftTitle;
  document.getElementById('giftRevealIntro').textContent = profile.giftIntro;
  document.getElementById('giftLocation').textContent = data.giftLocation || '—';
  document.getElementById('giftBlessing').textContent = data.completionBlessing || '';
  normalReportBtn.textContent = profile.reportButton;

  showScreen('giftRevealScreen');
}

function renderRescueSuccess(data) {
  clearInterval(rescueTimer);
  currentFinalResult = data;

  const profile = getModeProfile_();
  document.getElementById('rescueSuccessTitle').textContent = profile.rescueSuccessTitle;
  document.getElementById('rescueSuccessDescription').textContent = profile.rescueSuccessDescription;
  document.getElementById('rescueGiftLocation').textContent = data.giftLocation || '—';
  document.getElementById('rescueBlessing').textContent = data.completionBlessing || '';
  rescueReportBtn.textContent = profile.reportButton;

  showScreen('rescueSuccessScreen');
}

function restartPreview() {
  window.location.reload();
}

function renderLocked(data) {
  syncGameMode_(data);
  const profile = getModeProfile_();
  const name = data.nickname || '壽星';

  document.getElementById('lockedNickname').textContent = name;
  document.getElementById('lockedTitle').textContent = profile.lockedTitle;
  document.getElementById('lockedDescription').textContent =
    profile.lockedDescription.replace('{name}', name);

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
  missionUnlockBtn.textContent = getModeProfile_().unlockButton;
}


function normalizeGameMode_(value) {
  const text = String(value || '').trim();
  return MODE_PROFILES[text] ? text : '暖心模式';
}

function modeStorageKey_() {
  return `bm_mode_${gameId}`;
}

function restoreGameMode_() {
  try {
    const saved = localStorage.getItem(modeStorageKey_());
    if (MODE_PROFILES[saved]) {
      currentGameMode = saved;
      applyGameMode_();
    }
  } catch (ignore) {
    // localStorage unavailable: keep default mode until API responds.
  }
}

function syncGameMode_(data) {
  const candidate = String(
    data?.mode ||
    data?.gameMode ||
    ''
  ).trim();

  if (!MODE_PROFILES[candidate]) {
    if (modeConfirmed || MODE_PROFILES[currentGameMode]) {
      applyGameMode_();
    }
    return;
  }

  currentGameMode = candidate;
  modeConfirmed = true;

  try {
    localStorage.setItem(
      modeStorageKey_(),
      currentGameMode
    );
  } catch (ignore) {
    // Storage failure must never block the game.
  }

  applyGameMode_();
}

function getModeProfile_() {
  return MODE_PROFILES[normalizeGameMode_(currentGameMode)];
}

function applyGameMode_() {
  const profile = getModeProfile_();

  document.body.dataset.gameMode = profile.key;

  if (
    modeBadge &&
    modeBadgeCode &&
    modeBadgeLabel &&
    modeBadgeTagline
  ) {
    modeBadge.hidden = false;
    modeBadgeCode.textContent = profile.badgeCode;
    modeBadgeLabel.textContent = profile.badgeLabel;
    modeBadgeTagline.textContent = profile.tagline;
  }
}

async function playModeCeremony_(type, duration, stage) {
  const profile = getModeProfile_();
  const source = profile.ceremony?.[type];

  if (!source) return;

  const stageText = String(
    Number(stage) || 1
  ).padStart(2, '0');

  await playCeremony({
    kicker: source.kicker,
    title: String(source.title || '')
      .replace('{stage}', stageText),
    subtitle: source.subtitle,
    kind: type === 'stage'
      ? 'stage'
      : type === 'final'
        ? 'final'
        : type === 'rescue'
          ? 'rescue'
          : type === 'memory'
            ? 'memory'
            : type === 'start'
              ? 'access'
              : 'gift',
    duration,
  });
}

function showScreen(id) {
  const nextScreen = document.getElementById(id);

  document
    .querySelectorAll('.screen')
    .forEach(screen => screen.classList.remove('active'));

  if (nextScreen) {
    // Force a clean animation restart when revisiting the same screen.
    void nextScreen.offsetWidth;
    nextScreen.classList.add('active');
  }

  document.body.dataset.bmScreen = id;
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? 'auto' : 'smooth',
  });
}

function wait_(ms) {
  return new Promise(resolve => {
    ceremonyTimer = window.setTimeout(resolve, ms);
  });
}

async function playCeremony({
  kicker = '',
  title = '',
  subtitle = '',
  kind = 'stage',
  duration = 850,
} = {}) {
  if (
    !ceremonyOverlay ||
    !ceremonyKicker ||
    !ceremonyTitle ||
    !ceremonySubtitle
  ) {
    return;
  }

  clearTimeout(ceremonyTimer);

  ceremonyKicker.textContent = kicker;
  ceremonyTitle.textContent = title;
  ceremonySubtitle.textContent = subtitle;

  ceremonyOverlay.className =
    `ceremony-overlay ceremony-${kind}`;

  ceremonyOverlay.setAttribute(
    'aria-hidden',
    'false'
  );

  // Restart CSS animation even when the same ceremony happens twice.
  void ceremonyOverlay.offsetWidth;
  ceremonyOverlay.classList.add('show');

  if (reduceMotion) {
    await wait_(80);
    ceremonyOverlay.className = 'ceremony-overlay';
    ceremonyOverlay.setAttribute('aria-hidden', 'true');
    return;
  }

  await wait_(duration);

  ceremonyOverlay.classList.add('leaving');
  await wait_(240);

  ceremonyOverlay.className = 'ceremony-overlay';
  ceremonyOverlay.setAttribute('aria-hidden', 'true');
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
