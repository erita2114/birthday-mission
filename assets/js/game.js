const BM_GAME = Object.freeze({

  PREVIEW_PARAM:
    'preview',

});


const params =
  new URLSearchParams(
    window.location.search
  );


const gameId =
  String(
    params.get('g') || ''
  )
    .trim()
    .toUpperCase();


const previewToken =
  String(
    params.get(
      BM_GAME.PREVIEW_PARAM
    ) || ''
  ).trim();


const isPreview =
  Boolean(
    previewToken
  );


let previewStage =
  1;


let previewTotalStage =
  1;


let countdownTimer =
  null;


/* ===============================
   ELEMENTS
   =============================== */


const previewBanner =
  document.getElementById(
    'previewBanner'
  );


const startBtn =
  document.getElementById(
    'startBtn'
  );


const previewNavigation =
  document.getElementById(
    'previewNavigation'
  );


const formalPendingArea =
  document.getElementById(
    'formalPendingArea'
  );


const previewPrevBtn =
  document.getElementById(
    'previewPrevBtn'
  );


const previewNextBtn =
  document.getElementById(
    'previewNextBtn'
  );


const toast =
  document.getElementById(
    'toast'
  );


/* ===============================
   INIT
   =============================== */


init();


async function init() {


  if (!gameId) {

    showError(
      '網址缺少 Game ID。'
    );

    return;

  }


  if (isPreview) {

    previewBanner.hidden =
      false;

  }


  try {


    if (isPreview) {

      await loadPreviewState();

    }

    else {

      await loadFormalState();

    }


  }

  catch (error) {

    showError(
      error.message ||
      'Birthday Mission 讀取失敗。'
    );

  }

}


/* ===============================
   API
   =============================== */


async function callApi(
  payload
) {


  const response =
    await fetch(

      BM_CONFIG.API_URL,

      {

        method:
          'POST',

        redirect:
          'follow',

        headers: {

          'Content-Type':
            'text/plain;charset=utf-8',

        },

        body:
          JSON.stringify(
            payload
          ),

      }

    );


  if (
    !response.ok
  ) {

    throw new Error(
      `HTTP ${response.status}`
    );

  }


  const result =
    await response.json();


  if (
    result.ok !== true
  ) {

    throw new Error(
      result.error ||
      '系統連線失敗。'
    );

  }


  return result;

}


/* ===============================
   FORMAL STATE
   =============================== */


async function loadFormalState() {


  showScreen(
    'loadingScreen'
  );


  const result =
    await callApi({

      action:
        'state',

      g:
        gameId,

    });


  switch (
    result.status
  ) {


    case 'WAITING_APPROVAL':

      showScreen(
        'waitingScreen'
      );

      return;


    case 'DISABLED':

      showScreen(
        'disabledScreen'
      );

      return;


    case 'LOCKED':

      renderLocked(
        result
      );

      return;


    case 'READY':

      renderReady(
        result,
        false
      );

      return;


    case 'ACTIVE':

      renderMission(
        result,
        false
      );

      return;


    case 'ALL_MISSIONS_COMPLETE':

      /*
       * Phase 06
       * 會正式做完整畫面。
       */

      showError(
        '所有 Mission 已完成，禮物揭曉畫面將於 Phase 06 完成。'
      );

      return;


    case 'GIFT_REVEALED':

      /*
       * Phase 06 / 07
       */

      showError(
        '禮物已揭曉，後續畫面將於 Phase 06～07 完成。'
      );

      return;


    case 'CARD':

      /*
       * Phase 07
       */

      showError(
        '永久生日卡畫面將於 Phase 07 完成。'
      );

      return;


    default:

      throw new Error(
        '未知遊戲狀態。'
      );

  }

}


/* ===============================
   PREVIEW STATE
   =============================== */


async function loadPreviewState() {


  showScreen(
    'loadingScreen'
  );


  const result =
    await callApi({

      action:
        'previewState',

      g:
        gameId,

      preview:
        previewToken,

    });


  switch (
    result.status
  ) {


    case 'WAITING_APPROVAL':

      showScreen(
        'waitingScreen'
      );

      return;


    case 'DISABLED':

      showScreen(
        'disabledScreen'
      );

      return;


    case 'PREVIEW_READY':

      previewTotalStage =
        Number(
          result.totalStage
        );


      renderReady(
        result,
        true
      );

      return;


    default:

      throw new Error(
        '未知 Preview 狀態。'
      );

  }

}


/* ===============================
   START
   =============================== */


startBtn.addEventListener(
  'click',
  async () => {


    startBtn.disabled =
      true;


    startBtn.textContent =
      isPreview
        ? '測試模式載入中...'
        : 'Birthday Mission 啟動中...';


    try {


      if (isPreview) {


        /*
         * Preview 不呼叫正式 start。
         * 不改 Sheet。
         */


        previewStage =
          1;


        await loadPreviewStage();


      }

      else {


        const result =
          await callApi({

            action:
              'start',

            g:
              gameId,

          });


        if (
          result.status !==
          'ACTIVE'
        ) {

          throw new Error(
            '遊戲啟動狀態異常。'
          );

        }


        renderMission(
          result,
          false
        );

      }


    }

    catch (error) {


      showToast(
        error.message ||
        '啟動失敗'
      );


      startBtn.disabled =
        false;


      startBtn.textContent =
        isPreview
          ? '開始安全測試'
          : '啟動生日任務';

    }

  }
);


/* ===============================
   PREVIEW STAGE
   =============================== */


async function loadPreviewStage() {


  const result =
    await callApi({

      action:
        'previewStage',

      g:
        gameId,

      preview:
        previewToken,

      stage:
        previewStage,

    });


  renderMission(
    result,
    true
  );

}


/* ===============================
   PREVIEW NAVIGATION
   =============================== */


previewPrevBtn
  .addEventListener(
    'click',
    async () => {


      if (
        previewStage <= 1
      ) {

        return;

      }


      previewStage--;


      await loadPreviewStage();

    }
  );


previewNextBtn
  .addEventListener(
    'click',
    async () => {


      if (
        previewStage >=
        previewTotalStage
      ) {

        showToast(
          '已經是最後一個 Mission'
        );

        return;

      }


      previewStage++;


      await loadPreviewStage();

    }
  );


/* ===============================
   RENDER READY
   =============================== */


function renderReady(
  data,
  preview
) {


  document
    .getElementById(
      'readyNickname'
    )
    .textContent =
      data.nickname ||
      'PLAYER';


  document
    .getElementById(
      'readyMissionCount'
    )
    .textContent =
      `${data.totalStage} MISSION${
        Number(data.totalStage) > 1
          ? 'S'
          : ''
      }`;


  startBtn.disabled =
    false;


  startBtn.textContent =
    preview
      ? '開始安全測試'
      : '啟動生日任務';


  showScreen(
    'readyScreen'
  );

}


/* ===============================
   RENDER MISSION
   =============================== */


function renderMission(
  data,
  preview
) {


  const stage =
    Number(
      data.stage
    );


  const total =
    Number(
      data.totalStage
    );


  const padded =
    String(stage)
      .padStart(
        2,
        '0'
      );


  document
    .getElementById(
      'missionTitle'
    )
    .textContent =
      `MISSION ${padded}`;


  document
    .getElementById(
      'missionCounter'
    )
    .textContent =
      `${stage} / ${total}`;


  document
    .getElementById(
      'missionClue'
    )
    .textContent =
      data.clue ||
      '—';


  document
    .getElementById(
      'missionProgress'
    )
    .style.width =
      `${
        (
          stage /
          total
        ) * 100
      }%`;


  previewNavigation.hidden =
    !preview;


  formalPendingArea.hidden =
    preview;


  if (preview) {


    previewStage =
      stage;


    previewTotalStage =
      total;


    previewPrevBtn.disabled =
      stage <= 1;


    previewNextBtn.disabled =
      stage >= total;

  }


  showScreen(
    'missionScreen'
  );

}


/* ===============================
   LOCKED
   =============================== */


function renderLocked(
  data
) {


  document
    .getElementById(
      'lockedNickname'
    )
    .textContent =
      data.nickname ||
      '壽星';


  showScreen(
    'lockedScreen'
  );


  startCountdown(
    data.unlockAt
  );

}


/* ===============================
   COUNTDOWN
   =============================== */


function startCountdown(
  targetString
) {


  clearInterval(
    countdownTimer
  );


  const target =
    new Date(
      targetString
    );


  const update =
    () => {


      const diff =
        target.getTime() -
        Date.now();


      if (
        diff <= 0
      ) {


        clearInterval(
          countdownTimer
        );


        loadFormalState();


        return;

      }


      const seconds =
        Math.floor(
          diff / 1000
        );


      const days =
        Math.floor(
          seconds / 86400
        );


      const hours =
        Math.floor(
          (
            seconds % 86400
          ) / 3600
        );


      const minutes =
        Math.floor(
          (
            seconds % 3600
          ) / 60
        );


      const secs =
        seconds % 60;


      setCountdown(
        'countDays',
        days
      );


      setCountdown(
        'countHours',
        hours
      );


      setCountdown(
        'countMinutes',
        minutes
      );


      setCountdown(
        'countSeconds',
        secs
      );

    };


  update();


  countdownTimer =
    setInterval(
      update,
      1000
    );

}


function setCountdown(
  id,
  value
) {


  document
    .getElementById(id)
    .textContent =
      String(value)
        .padStart(
          2,
          '0'
        );

}


/* ===============================
   SCREEN
   =============================== */


function showScreen(
  id
) {


  document
    .querySelectorAll(
      '.screen'
    )
    .forEach(
      screen => {

        screen.classList.remove(
          'active'
        );

      }
    );


  document
    .getElementById(id)
    ?.classList.add(
      'active'
    );

}


/* ===============================
   ERROR
   =============================== */


function showError(
  message
) {


  clearInterval(
    countdownTimer
  );


  document
    .getElementById(
      'errorMessage'
    )
    .textContent =
      message;


  showScreen(
    'errorScreen'
  );

}


/* ===============================
   TOAST
   =============================== */


let toastTimer;


function showToast(
  message
) {


  toast.textContent =
    message;


  toast.classList.add(
    'show'
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          'show'
        );

      },
      2400
    );

}
