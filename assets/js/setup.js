const BM_SETUP = Object.freeze({

  TOTAL_STEPS: 4,

  MAX_MISSIONS: 4,

  STORAGE_KEY:
    'birthdayMissionDraftV2',

  STEP_NAMES: [
    '基本設定',
    '尋寶 Mission',
    '最終生日禮物',
    '永久電子生日卡'
  ],

  MAX_PHOTO_SIZE:
    8 * 1024 * 1024

});


let currentStep = 1;


const form =
  document.getElementById(
    'missionForm'
  );


const nextBtn =
  document.getElementById(
    'nextBtn'
  );


const backBtn =
  document.getElementById(
    'backBtn'
  );


const progressBar =
  document.getElementById(
    'progressBar'
  );


const stepLabel =
  document.getElementById(
    'stepLabel'
  );


const stepName =
  document.getElementById(
    'stepName'
  );


const toast =
  document.getElementById(
    'toast'
  );


const clearDraftBtn =
  document.getElementById(
    'clearDraftBtn'
  );


const missionsContainer =
  document.getElementById(
    'missionsContainer'
  );


const missionStepTitle =
  document.getElementById(
    'missionStepTitle'
  );


const photoInput =
  document.getElementById(
    'cardPhoto'
  );


const photoPreview =
  document.getElementById(
    'photoPreview'
  );


const uploadEmpty =
  document.getElementById(
    'uploadEmpty'
  );

const confirmationPage =
  document.getElementById(
    'confirmationPage'
  );


const confirmBasic =
  document.getElementById(
    'confirmBasic'
  );


const confirmMissions =
  document.getElementById(
    'confirmMissions'
  );


const confirmMissionSubtitle =
  document.getElementById(
    'confirmMissionSubtitle'
  );


const confirmGift =
  document.getElementById(
    'confirmGift'
  );


const confirmCard =
  document.getElementById(
    'confirmCard'
  );


const editDataBtn =
  document.getElementById(
    'editDataBtn'
  );


const confirmCreateBtn =
  document.getElementById(
    'confirmCreateBtn'
  );


const finalAgreement =
  document.getElementById(
    'finalAgreement'
  );

const creationSuccessPage =
  document.getElementById(
    'creationSuccessPage'
  );


const successGameId =
  document.getElementById(
    'successGameId'
  );


const successGameUrl =
  document.getElementById(
    'successGameUrl'
  );


const successMissionCards =
  document.getElementById(
    'successMissionCards'
  );


const copyGameUrlBtn =
  document.getElementById(
    'copyGameUrlBtn'
  );


let isSubmitting =
  false;


/* ======================================
 * INIT
 * ====================================== */


init();


function init() {

  buildMissionFields();

  setBirthdayMinimum();

  restoreDraft();

  updateMissionVisibility();

  bindEvents();

  updateStepUI();

}


/* ======================================
 * BUILD MAX 4 MISSIONS
 * ====================================== */


function buildMissionFields() {

  missionsContainer.innerHTML = '';


  for (
    let stage = 1;
    stage <= BM_SETUP.MAX_MISSIONS;
    stage++
  ) {

    const padded =
      String(stage)
        .padStart(
          2,
          '0'
        );


    missionsContainer
      .insertAdjacentHTML(
        'beforeend',
        `

        <article
          class="mission-card"
          data-mission-stage="${stage}"
          hidden
        >

          <div class="mission-head">

            <div>

              <div class="mission-label">
                PRIVATE MISSION
              </div>

              <div class="mission-title">
                MISSION ${padded}
              </div>

            </div>


            <div class="mission-badge">
              ${stage}/4
            </div>

          </div>


          <div class="field">

            <label
              for="mission${stage}HideLocation"
            >
              實體 Mission Card 藏匿位置
              <span>*</span>
            </label>

            <input
              id="mission${stage}HideLocation"
              name="mission${stage}HideLocation"
              type="text"
              maxlength="200"
              placeholder="例如：冰箱飲料旁"
              required
            >

            <div class="help">
              這是送禮人實際藏 Mission Card
              的位置，不會直接顯示給壽星。
            </div>

          </div>


          <div class="field">

            <label
              for="mission${stage}Clue"
            >
              初始線索
              <span>*</span>
            </label>

            <textarea
              id="mission${stage}Clue"
              name="mission${stage}Clue"
              rows="4"
              maxlength="400"
              placeholder="例如：找一個你每天可能會打開很多次的地方。"
              required
            ></textarea>

          </div>


          <div class="field">

            <label
              for="mission${stage}HintQuestion"
            >
              提示解鎖題目
              <span>*</span>
            </label>

            <textarea
              id="mission${stage}HintQuestion"
              name="mission${stage}HintQuestion"
              rows="3"
              maxlength="300"
              placeholder="例如：我們第一次約會吃什麼？"
              required
            ></textarea>

          </div>


          <div class="field">

            <label
              for="mission${stage}HintAnswer"
            >
              正確答案
              <span>*</span>
            </label>

            <input
              id="mission${stage}HintAnswer"
              name="mission${stage}HintAnswer"
              type="text"
              maxlength="300"
              placeholder="例如：火鍋"
              required
            >

            <div class="help">
              多個可以接受的答案請使用「｜」分隔。
              例如：火鍋｜麻辣鍋｜海底撈
            </div>

          </div>


          <div class="field">

            <label
              for="mission${stage}Hint"
            >
              答對後提示
              <span>*</span>
            </label>

            <textarea
              id="mission${stage}Hint"
              name="mission${stage}Hint"
              rows="4"
              maxlength="400"
              placeholder="例如：是一個冷冷的地方。"
              required
            ></textarea>

          </div>

        </article>

        `
      );

  }

}


/* ======================================
 * MISSION COUNT
 * ====================================== */


function getMissionCount() {

  const value =
    getChecked(
      'missionCount'
    );


  const count =
    Number(value);


  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count >
      BM_SETUP.MAX_MISSIONS
  ) {

    return 0;

  }


  return count;

}


function updateMissionVisibility() {

  const count =
    getMissionCount();


  const cards =
    document.querySelectorAll(
      '.mission-card'
    );


  cards.forEach(card => {

    const stage =
      Number(
        card.dataset
          .missionStage
      );


    const active =
      count > 0 &&
      stage <= count;


    card.hidden =
      !active;


    card
      .querySelectorAll(
        'input, textarea'
      )
      .forEach(field => {

        field.disabled =
          !active;

      });


    const badge =
      card.querySelector(
        '.mission-badge'
      );


    if (badge) {

      badge.textContent =
        active
          ? `${stage}/${count}`
          : `${stage}/4`;

    }

  });


  missionStepTitle.textContent =
    count
      ? `設定 ${count} 個 Mission`
      : '設定 Mission';

}


/* ======================================
 * EVENTS
 * ====================================== */


function bindEvents() {


  nextBtn.addEventListener(
    'click',
    handleNext
  );


  backBtn.addEventListener(
    'click',
    handleBack
  );


  form.addEventListener(
    'input',
    debounce(
      saveDraft,
      350
    )
  );


  form.addEventListener(
    'change',
    event => {

      if (
        event.target.name ===
        'missionCount'
      ) {

        updateMissionVisibility();

      }

      saveDraft();

    }
  );


  photoInput.addEventListener(
    'change',
    handlePhoto
  );


  clearDraftBtn.addEventListener(
    'click',
    clearDraft
  );

  editDataBtn.addEventListener(
  'click',
  returnToEdit
);


finalAgreement.addEventListener(
  'change',
  () => {

    confirmCreateBtn.disabled =
      !finalAgreement.checked;

  }
);


confirmCreateBtn.addEventListener(
  'click',
  handleConfirmCreate
);

  copyGameUrlBtn.addEventListener(
  'click',
  copySuccessGameUrl
);

}


/* ======================================
 * NEXT / BACK
 * ====================================== */


function handleNext() {


  if (
    !validateCurrentStep()
  ) {

    return;

  }


  saveDraft();


  if (
    currentStep <
    BM_SETUP.TOTAL_STEPS
  ) {


    currentStep++;


    updateStepUI();


    scrollToTop();


    return;

  }


  showConfirmationPage();

}


function handleBack() {


  if (
    currentStep <= 1
  ) {

    return;

  }


  currentStep--;


  updateStepUI();


  scrollToTop();

}


/* ======================================
 * STEP UI
 * ====================================== */


function updateStepUI() {


  document
    .querySelectorAll(
      '.form-step'
    )
    .forEach(step => {

      step.classList.toggle(
        'active',
        Number(
          step.dataset.step
        ) === currentStep
      );

    });


  stepLabel.textContent =
    `STEP ${
      String(currentStep)
        .padStart(
          2,
          '0'
        )
    } / 04`;


  stepName.textContent =
    BM_SETUP
      .STEP_NAMES[
        currentStep - 1
      ];


  progressBar.style.width =
    `${
      (
        currentStep /
        BM_SETUP.TOTAL_STEPS
      ) * 100
    }%`;


  backBtn.disabled =
    currentStep === 1;


  nextBtn.textContent =
    currentStep ===
    BM_SETUP.TOTAL_STEPS
      ? '儲存並前往確認'
      : '下一步';

}


/* ======================================
 * VALIDATION
 * ====================================== */


function validateCurrentStep() {


  const step =
    document.querySelector(
      `.form-step[data-step="${currentStep}"]`
    );


  const fields =
    [
      ...step.querySelectorAll(
        'input[required], textarea[required]'
      )
    ];


  /*
   * 一般欄位
   */


  for (
    const field of fields
  ) {


    if (
      field.disabled
    ) {

      continue;

    }


    if (
      field.type === 'radio'
    ) {

      continue;

    }


    if (
      !field.checkValidity()
    ) {


      field.reportValidity();


      field.focus({
        preventScroll: true
      });


      field.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });


      return false;

    }

  }


  /*
   * Radio Groups
   */


  const radioGroups =
    [
      ...new Set(

        fields

          .filter(
            field =>
              field.type ===
              'radio' &&
              !field.disabled
          )

          .map(
            field =>
              field.name
          )

      )
    ];


  for (
    const name
    of radioGroups
  ) {


    const checked =
      step.querySelector(
        `input[name="${name}"]:checked`
      );


    if (!checked) {


      if (
        name ===
        'missionCount'
      ) {

        showToast(
          '請選擇要安排幾個 Mission'
        );

      }

      else if (
        name ===
        'gameMode'
      ) {

        showToast(
          '請選擇遊戲模式'
        );

      }

      else if (
        name ===
        'cardTemplate'
      ) {

        showToast(
          '請選擇生日卡模板'
        );

      }

      else {

        showToast(
          '請完成此頁選擇'
        );

      }


      return false;

    }

  }


  /*
   * Step 01
   */


  if (
    currentStep === 1
  ) {


    const missionCount =
      getMissionCount();


    if (
      missionCount < 1 ||
      missionCount > 4
    ) {

      showToast(
        'Mission 數量必須為 1～4'
      );

      return false;

    }


    const unlock =
      form.elements
        .unlockTime
        .value;


    const rescue =
      form.elements
        .rescueTime
        .value;


    if (
      unlock &&
      rescue &&
      rescue <= unlock
    ) {

      showToast(
        '救援時間必須晚於遊戲解鎖時間'
      );


      form.elements
        .rescueTime
        .focus();


      return false;

    }

  }


  /*
   * Step 04 Photo
   */


  if (
    currentStep === 4 &&
    !photoInput.files.length
  ) {


    showToast(
      '請選擇生日卡照片'
    );


    photoInput
      .closest(
        '.upload-box'
      )
      .scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });


    return false;

  }


  return true;

}


/* ======================================
 * PHOTO
 * ====================================== */


function handlePhoto() {


  const file =
    photoInput.files[0];


  if (!file) {

    resetPhotoPreview();

    return;

  }


  const allowedTypes = [

    'image/jpeg',

    'image/png',

    'image/webp'

  ];


  if (
    !allowedTypes.includes(
      file.type
    )
  ) {


    showToast(
      '照片格式只支援 JPG、PNG、WEBP'
    );


    photoInput.value = '';


    resetPhotoPreview();


    return;

  }


  if (
    file.size >
    BM_SETUP.MAX_PHOTO_SIZE
  ) {


    showToast(
      '照片請控制在 8MB 以內'
    );


    photoInput.value = '';


    resetPhotoPreview();


    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    event => {


      photoPreview.src =
        event.target.result;


      photoPreview.hidden =
        false;


      uploadEmpty.hidden =
        true;

    };


  reader.readAsDataURL(
    file
  );

}


function resetPhotoPreview() {


  photoPreview.src = '';


  photoPreview.hidden =
    true;


  uploadEmpty.hidden =
    false;

}


/* ======================================
 * DRAFT
 * ====================================== */


function saveDraft() {


  const data =
    collectDraftData();


  localStorage.setItem(
    BM_SETUP.STORAGE_KEY,
    JSON.stringify(data)
  );

}


/* ======================================
 * COLLECT DATA
 * ====================================== */


function collectDraftData() {


  const allMissions = [];


  for (
    let stage = 1;
    stage <=
      BM_SETUP.MAX_MISSIONS;
    stage++
  ) {


    allMissions.push({


      hideLocation:
        getValue(
          `mission${stage}HideLocation`
        ),


      clue:
        getValue(
          `mission${stage}Clue`
        ),


      hintQuestion:
        getValue(
          `mission${stage}HintQuestion`
        ),


      hintAnswer:
        getValue(
          `mission${stage}HintAnswer`
        ),


      hint:
        getValue(
          `mission${stage}Hint`
        )


    });

  }


  return {


    orderNo:
      getValue(
        'orderNo'
      ),


    nickname:
      getValue(
        'nickname'
      ),


    birthdayDate:
      getValue(
        'birthdayDate'
      ),


    missionCount:
      getMissionCount(),


    gameMode:
      getChecked(
        'gameMode'
      ),


    unlockTime:
      getValue(
        'unlockTime'
      ),


    rescueTime:
      getValue(
        'rescueTime'
      ),


    /*
     * 暫存保留四關內容。
     *
     * 正式送出時，
     * 03-D 只會送出：
     *
     * allMissions.slice(
     *   0,
     *   missionCount
     * )
     */


    missions:
      allMissions,


    giftLocation:
      getValue(
        'giftLocation'
      ),


    completionBlessing:
      getValue(
        'completionBlessing'
      ),


    card: {


      title:
        getValue(
          'cardTitle'
        ),


      subtitle:
        getValue(
          'cardSubtitle'
        ),


      message:
        getValue(
          'cardMessage'
        ),


      signature:
        getValue(
          'cardSignature'
        ),


      template:
        getChecked(
          'cardTemplate'
        )


    }


  };

}


/* ======================================
 * RESTORE DRAFT
 * ====================================== */


function restoreDraft() {


  const raw =
    localStorage.getItem(
      BM_SETUP.STORAGE_KEY
    );


  if (!raw) {

    return;

  }


  try {


    const data =
      JSON.parse(raw);


    setValue(
      'orderNo',
      data.orderNo
    );


    setValue(
      'nickname',
      data.nickname
    );


    setValue(
      'birthdayDate',
      data.birthdayDate
    );


    setRadio(
      'missionCount',
      String(
        data.missionCount || ''
      )
    );


    setRadio(
      'gameMode',
      data.gameMode
    );


    setValue(
      'unlockTime',
      data.unlockTime
    );


    setValue(
      'rescueTime',
      data.rescueTime
    );


    if (
      Array.isArray(
        data.missions
      )
    ) {


      data.missions
        .forEach(
          (mission, index) => {


            const stage =
              index + 1;


            if (
              stage >
              BM_SETUP.MAX_MISSIONS
            ) {

              return;

            }


            setValue(
              `mission${stage}HideLocation`,
              mission.hideLocation
            );


            setValue(
              `mission${stage}Clue`,
              mission.clue
            );


            setValue(
              `mission${stage}HintQuestion`,
              mission.hintQuestion
            );


            setValue(
              `mission${stage}HintAnswer`,
              mission.hintAnswer
            );


            setValue(
              `mission${stage}Hint`,
              mission.hint
            );

          }
        );

    }


    setValue(
      'giftLocation',
      data.giftLocation
    );


    setValue(
      'completionBlessing',
      data.completionBlessing
    );


    if (
      data.card
    ) {


      setValue(
        'cardTitle',
        data.card.title
      );


      setValue(
        'cardSubtitle',
        data.card.subtitle
      );


      setValue(
        'cardMessage',
        data.card.message
      );


      setValue(
        'cardSignature',
        data.card.signature
      );


      setRadio(
        'cardTemplate',
        data.card.template
      );

    }


    /*
     * 瀏覽器安全限制：
     *
     * 使用者選擇的 File
     * 不能透過 localStorage
     * 自動恢復。
     *
     * 重新整理後照片需要重選。
     */


  }

  catch (error) {


    console.error(
      'Draft restore failed:',
      error
    );

  }

}


/* ======================================
 * CLEAR
 * ====================================== */


function clearDraft() {


  const confirmed =
    confirm(
      '確定要清除目前所有已填資料嗎？'
    );


  if (!confirmed) {

    return;

  }


  localStorage.removeItem(
    BM_SETUP.STORAGE_KEY
  );


  form.reset();


  form.elements
    .unlockTime
    .value =
      '00:00';


  form.elements
    .rescueTime
    .value =
      '22:00';


  form.elements
    .cardTitle
    .value =
      'HAPPY BIRTHDAY';


  resetPhotoPreview();


  updateMissionVisibility();


  currentStep = 1;


  updateStepUI();


  scrollToTop();


  showToast(
    '暫存資料已清除'
  );

}


/* ======================================
 * HELPERS
 * ====================================== */


function getValue(id) {


  const element =
    document.getElementById(
      id
    );


  if (!element) {

    return '';

  }


  return String(
    element.value || ''
  ).trim();

}


function setValue(
  id,
  value
) {


  const element =
    document.getElementById(
      id
    );


  if (
    element &&
    value !== undefined &&
    value !== null
  ) {


    element.value =
      value;

  }

}


function getChecked(name) {


  const checked =
    document.querySelector(
      `input[name="${name}"]:checked`
    );


  return checked
    ? checked.value
    : '';

}


function setRadio(
  name,
  value
) {


  if (!value) {

    return;

  }


  const radios =
    document.querySelectorAll(
      `input[name="${name}"]`
    );


  radios.forEach(
    radio => {


      if (
        String(radio.value) ===
        String(value)
      ) {


        radio.checked =
          true;

      }

    }
  );

}


/* ======================================
 * BIRTHDAY DATE
 * ====================================== */


function setBirthdayMinimum() {


  const input =
    document.getElementById(
      'birthdayDate'
    );


  const now =
    new Date();


  const yyyy =
    now.getFullYear();


  const mm =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      '0'
    );


  const dd =
    String(
      now.getDate()
    ).padStart(
      2,
      '0'
    );


  input.min =
    `${yyyy}-${mm}-${dd}`;

}


/* ======================================
 * SCROLL
 * ====================================== */


function scrollToTop() {


  window.scrollTo({

    top: 0,

    behavior:
      'smooth'

  });

}


/* ======================================
 * TOAST
 * ====================================== */


let toastTimer;


function showToast(message) {


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
      2600
    );

}


/* ======================================
 * DEBOUNCE
 * ====================================== */


function debounce(
  fn,
  wait
) {


  let timeout;


  return (...args) => {


    clearTimeout(
      timeout
    );


    timeout =
      setTimeout(
        () =>
          fn(...args),
        wait
      );

  };

}

/* ======================================
 * FINAL CONFIRMATION
 * ====================================== */


function showConfirmationPage() {


  const data =
    collectDraftData();


  const missionCount =
    Number(
      data.missionCount
    );


  if (
    missionCount < 1 ||
    missionCount > 4
  ) {


    showToast(
      'Mission 數量資料異常'
    );


    return;

  }


  renderConfirmBasic(
    data
  );


  renderConfirmMissions(
    data
  );


  renderConfirmGift(
    data
  );


  renderConfirmCard(
    data
  );


  /*
   * 隱藏原本填寫區
   */


  document
    .querySelector('.hero')
    .hidden =
      true;


  document
    .querySelector('.progress-box')
    .hidden =
      true;


  form.hidden =
    true;


  document
    .querySelector('.form-nav')
    .hidden =
      true;


  document
    .querySelector('.autosave-note')
    .hidden =
      true;


  /*
   * 顯示確認頁
   */


  confirmationPage.hidden =
    false;


  finalAgreement.checked =
    false;


  confirmCreateBtn.disabled =
    true;


  scrollToTop();

}


/* ======================================
 * BASIC
 * ====================================== */


function renderConfirmBasic(
  data
) {


  confirmBasic.innerHTML = `

    ${confirmRow(
      '蝦皮訂單編號',
      data.orderNo
    )}

    ${confirmRow(
      '壽星暱稱',
      data.nickname
    )}

    ${confirmRow(
      '生日日期',
      formatBirthdayDate(
        data.birthdayDate
      )
    )}

    ${confirmRow(
      'Mission 數量',
      `${data.missionCount} 關`
    )}

    ${confirmRow(
      '遊戲模式',
      data.gameMode
    )}

    ${confirmRow(
      '解鎖時間',
      data.unlockTime
    )}

    ${confirmRow(
      '人道救援時間',
      data.rescueTime
    )}

  `;

}


/* ======================================
 * MISSIONS
 * ====================================== */


function renderConfirmMissions(
  data
) {


  const count =
    Number(
      data.missionCount
    );


  confirmMissionSubtitle.textContent =
    `本次共安排 ${count} 個 Mission`;


  confirmMissions.innerHTML =
    '';


  const activeMissions =
    data.missions.slice(
      0,
      count
    );


  activeMissions.forEach(
    (
      mission,
      index
    ) => {


      const stage =
        index + 1;


      const padded =
        String(stage)
          .padStart(
            2,
            '0'
          );


      const article =
        document.createElement(
          'article'
        );


      article.className =
        'confirm-mission';


      article.innerHTML = `

        <div class="confirm-mission-head">

          <div>

            <div class="confirm-mission-label">
              PRIVATE MISSION
            </div>

            <div class="confirm-mission-title">
              MISSION ${padded}
            </div>

          </div>


          <div class="confirm-mission-number">
            ${stage}/${count}
          </div>

        </div>


        ${confirmRow(
          '實體卡藏匿位置',
          mission.hideLocation
        )}


        ${confirmRow(
          '初始線索',
          mission.clue
        )}


        ${confirmRow(
          '提示解鎖題目',
          mission.hintQuestion
        )}


        ${confirmRow(
          '正確答案',
          mission.hintAnswer
        )}


        ${confirmRow(
          '答對後提示',
          mission.hint
        )}

      `;


      confirmMissions.appendChild(
        article
      );

    }
  );

}


/* ======================================
 * GIFT
 * ====================================== */


function renderConfirmGift(
  data
) {


  confirmGift.innerHTML = `

    ${confirmRow(
      '最終禮物位置',
      data.giftLocation
    )}

    ${confirmRow(
      '破關祝福',
      data.completionBlessing
    )}

  `;

}


/* ======================================
 * CARD
 * ====================================== */


function renderConfirmCard(
  data
) {


  let photoHtml =
    '';


  if (
    photoInput.files.length &&
    photoPreview.src
  ) {


    photoHtml = `

      <div class="confirm-photo">

        <img
          src="${photoPreview.src}"
          alt="生日卡照片確認"
        >

      </div>

    `;

  }


  confirmCard.innerHTML = `

    ${confirmRow(
      '卡片標題',
      data.card.title
    )}

    ${confirmRow(
      '卡片副標題',
      data.card.subtitle
    )}

    ${confirmRow(
      '生日祝福',
      data.card.message
    )}

    ${confirmRow(
      '署名',
      data.card.signature
    )}

    <div class="confirm-row">

      <div class="confirm-key">
        卡片模板
      </div>

      <div class="confirm-value">

        <span class="template-tag">
          ${escapeHtml(
            data.card.template
          )}
        </span>

      </div>

    </div>

    <div class="confirm-row">

      <div class="confirm-key">
        生日卡照片
      </div>

      <div class="confirm-value">
        ${
          photoInput.files.length
            ? escapeHtml(
                photoInput
                  .files[0]
                  .name
              )
            : '尚未選擇'
        }
      </div>

    </div>

    ${photoHtml}

  `;

}


/* ======================================
 * RETURN TO EDIT
 * ====================================== */


function returnToEdit() {


  confirmationPage.hidden =
    true;


  document
    .querySelector('.hero')
    .hidden =
      false;


  document
    .querySelector('.progress-box')
    .hidden =
      false;


  form.hidden =
    false;


  document
    .querySelector('.form-nav')
    .hidden =
      false;


  document
    .querySelector('.autosave-note')
    .hidden =
      false;


  /*
   * 返回最後一頁修改
   */


  currentStep =
    BM_SETUP.TOTAL_STEPS;


  updateStepUI();


  scrollToTop();

}


/* ======================================
 * CREATE BUTTON
 * ====================================== */


async function handleConfirmCreate() {


  if (
    isSubmitting
  ) {

    return;

  }


  if (
    !finalAgreement.checked
  ) {

    showToast(
      '請先確認資料內容'
    );

    return;

  }


  if (
    !photoInput.files.length
  ) {

    showToast(
      '生日卡照片已遺失，請返回重新選擇'
    );

    return;

  }


  isSubmitting =
    true;


  setCreateLoading(
    true
  );


  try {


    /* ===============================
       COLLECT
       =============================== */


    const draft =
      collectDraftData();


    const missionCount =
      Number(
        draft.missionCount
      );


    if (
      missionCount < 1 ||
      missionCount > 4
    ) {

      throw new Error(
        'Mission 數量異常'
      );

    }


    /*
     * 非常重要：
     *
     * 客戶選 2 關，
     * 就只傳前兩關。
     */


    const activeMissions =
      draft.missions.slice(
        0,
        missionCount
      );


    /* ===============================
       PHOTO
       =============================== */


    const photo =
      await preparePhotoForUpload(
        photoInput.files[0]
      );


    /* ===============================
       PAYLOAD
       =============================== */


    const payload = {

      action:
        'create',

      orderNo:
        draft.orderNo,

      nickname:
        draft.nickname,

      birthdayDate:
        draft.birthdayDate,

      unlockTime:
        draft.unlockTime,

      rescueTime:
        draft.rescueTime,

      gameMode:
        draft.gameMode,

      giftLocation:
        draft.giftLocation,

      completionBlessing:
        draft.completionBlessing,

      missions:
        activeMissions,

      card: {

        title:
          draft.card.title,

        subtitle:
          draft.card.subtitle,

        message:
          draft.card.message,

        signature:
          draft.card.signature,

        template:
          draft.card.template,

        photo,

      },

    };


    /* ===============================
       POST
       =============================== */


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
        'Birthday Mission 建立失敗'
      );

    }


    if (
      result.status !==
      'CREATED'
    ) {

      throw new Error(
        '系統回傳狀態異常'
      );

    }


    /* ===============================
       SUCCESS
       =============================== */


    localStorage.removeItem(
      BM_SETUP.STORAGE_KEY
    );


    showCreationSuccess(
      result
    );


  }

  catch (error) {


    console.error(
      error
    );


    showToast(
      error?.message ||
      '建立失敗，請稍後再試'
    );


    setCreateLoading(
      false
    );


    isSubmitting =
      false;

  }

}


/* ======================================
 * CONFIRM HELPERS
 * ====================================== */


function confirmRow(
  key,
  value
) {


  return `

    <div class="confirm-row">

      <div class="confirm-key">
        ${escapeHtml(key)}
      </div>

      <div class="confirm-value">
        ${escapeHtml(
          value || '—'
        )}
      </div>

    </div>

  `;

}


function formatBirthdayDate(
  value
) {


  if (!value) {

    return '—';

  }


  const parts =
    String(value)
      .split('-');


  if (
    parts.length !== 3
  ) {

    return value;

  }


  return (
    parts[0] +
    ' / ' +
    parts[1] +
    ' / ' +
    parts[2]
  );

}


/*
 * 非常重要：
 *
 * 客戶輸入內容放進 innerHTML 前
 * 必須 escape。
 *
 * 避免輸入 HTML / Script
 * 破壞確認頁。
 */


function escapeHtml(
  value
) {


  return String(
    value ?? ''
  )

    .replace(
      /&/g,
      '&amp;'
    )

    .replace(
      /</g,
      '&lt;'
    )

    .replace(
      />/g,
      '&gt;'
    )

    .replace(
      /"/g,
      '&quot;'
    )

    .replace(
      /'/g,
      '&#039;'
    );

}

function setCreateLoading(
  loading
) {


  confirmCreateBtn.disabled =
    loading ||
    !finalAgreement.checked;


  editDataBtn.disabled =
    loading;


  finalAgreement.disabled =
    loading;


  confirmCreateBtn.textContent =
    loading
      ? 'Birthday Mission 建立中...'
      : '確認建立 Birthday Mission';

}

async function preparePhotoForUpload(
  file
) {


  if (!file) {

    throw new Error(
      '找不到生日卡照片'
    );

  }


  const image =
    await loadImageFile(
      file
    );


  let width =
    image.naturalWidth;


  let height =
    image.naturalHeight;


  const maxDimension =
    1600;


  if (
    Math.max(
      width,
      height
    ) >
    maxDimension
  ) {


    const ratio =
      maxDimension /
      Math.max(
        width,
        height
      );


    width =
      Math.round(
        width * ratio
      );


    height =
      Math.round(
        height * ratio
      );

  }


  let quality =
    0.84;


  let blob =
    null;


  /*
   * 最多嘗試 6 次。
   */


  for (
    let attempt = 0;
    attempt < 6;
    attempt++
  ) {


    const canvas =
      document.createElement(
        'canvas'
      );


    canvas.width =
      width;


    canvas.height =
      height;


    const ctx =
      canvas.getContext(
        '2d'
      );


    /*
     * PNG 透明背景轉 JPEG 時
     * 避免變黑底。
     */


    ctx.fillStyle =
      '#ffffff';


    ctx.fillRect(
      0,
      0,
      width,
      height
    );


    ctx.drawImage(

      image,

      0,
      0,

      width,
      height

    );


    blob =
      await canvasToBlob(

        canvas,

        'image/jpeg',

        quality

      );


    /*
     * 目標控制在 1.5MB 內
     */


    if (
      blob.size <=
      1.5 * 1024 * 1024
    ) {

      break;

    }


    width =
      Math.round(
        width * 0.82
      );


    height =
      Math.round(
        height * 0.82
      );


    quality =
      Math.max(
        0.60,
        quality - 0.05
      );

  }


  if (!blob) {

    throw new Error(
      '照片壓縮失敗'
    );

  }


  if (
    blob.size >
    1.8 * 1024 * 1024
  ) {

    throw new Error(
      '照片仍然過大，請更換照片'
    );

  }


  const dataBase64 =
    await blobToBase64(
      blob
    );


  return {

    name:
      file.name,

    mimeType:
      'image/jpeg',

    dataBase64,

  };

}


/* ======================================
 * LOAD IMAGE
 * ====================================== */


function loadImageFile(
  file
) {


  return new Promise(
    (
      resolve,
      reject
    ) => {


      const objectUrl =
        URL.createObjectURL(
          file
        );


      const image =
        new Image();


      image.onload =
        () => {


          URL.revokeObjectURL(
            objectUrl
          );


          resolve(
            image
          );

        };


      image.onerror =
        () => {


          URL.revokeObjectURL(
            objectUrl
          );


          reject(
            new Error(
              '照片讀取失敗'
            )
          );

        };


      image.src =
        objectUrl;

    }
  );

}


/* ======================================
 * CANVAS → BLOB
 * ====================================== */


function canvasToBlob(
  canvas,
  type,
  quality
) {


  return new Promise(
    (
      resolve,
      reject
    ) => {


      canvas.toBlob(

        blob => {


          if (!blob) {

            reject(
              new Error(
                '照片壓縮失敗'
              )
            );


            return;

          }


          resolve(
            blob
          );

        },

        type,

        quality

      );

    }
  );

}


/* ======================================
 * BLOB → BASE64
 * ====================================== */


function blobToBase64(
  blob
) {


  return new Promise(
    (
      resolve,
      reject
    ) => {


      const reader =
        new FileReader();


      reader.onload =
        () => {


          const result =
            String(
              reader.result || ''
            );


          const comma =
            result.indexOf(
              ','
            );


          if (
            comma === -1
          ) {


            reject(
              new Error(
                '照片編碼失敗'
              )
            );


            return;

          }


          resolve(
            result.slice(
              comma + 1
            )
          );

        };


      reader.onerror =
        () =>
          reject(
            new Error(
              '照片編碼失敗'
            )
          );


      reader.readAsDataURL(
        blob
      );

    }
  );

}

function showCreationSuccess(
  result
) {


  confirmationPage.hidden =
    true;


  creationSuccessPage.hidden =
    false;


  successGameId.textContent =
    result.gameId;


  successGameUrl.textContent =
    result.gameUrl;


  successGameUrl.href =
    result.gameUrl;


  successMissionCards.innerHTML =
    '';


  const missionCards =
    Array.isArray(
      result.missionCards
    )
      ? result.missionCards
      : [];


  missionCards.forEach(
    mission => {


      const stage =
        Number(
          mission.stage
        );


      const padded =
        String(stage)
          .padStart(
            2,
            '0'
          );


      const card =
        document.createElement(
          'article'
        );


      card.className =
        'success-mission';


      card.innerHTML = `

        <div class="success-mission-head">

          <div class="success-mission-name">
            MISSION ${padded}
          </div>

          <div class="success-code">
            ${escapeHtml(
              mission.code
            )}
          </div>

        </div>


        <div class="success-location">

          <span>
            實體卡藏匿位置
          </span>

          <strong>
            ${escapeHtml(
              mission.hideLocation
            )}
          </strong>

        </div>

      `;


      successMissionCards
        .appendChild(
          card
        );

    }
  );


  scrollToTop();


  isSubmitting =
    false;

}


/* ======================================
 * COPY GAME URL
 * ====================================== */


async function copySuccessGameUrl() {


  const url =
    successGameUrl.textContent;


  if (!url) {

    return;

  }


  try {


    await navigator.clipboard
      .writeText(
        url
      );


    showToast(
      'NFC 專屬網址已複製'
    );


  }

  catch (error) {


    const textarea =
      document.createElement(
        'textarea'
      );


    textarea.value =
      url;


    textarea.style.position =
      'fixed';


    textarea.style.opacity =
      '0';


    document.body
      .appendChild(
        textarea
      );


    textarea.select();


    document.execCommand(
      'copy'
    );


    textarea.remove();


    showToast(
      'NFC 專屬網址已複製'
    );

  }

}
