const BM_SETUP = Object.freeze({
  TOTAL_STEPS: 4,

  STORAGE_KEY:
    'birthdayMissionDraftV1',

  STEP_NAMES: [
    '基本設定',
    '四個 Mission',
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


/* ======================================
 * INIT
 * ====================================== */

init();


function init() {

  buildMissionFields();

  setBirthdayMinimum();

  restoreDraft();

  bindEvents();

  updateStepUI();

}


/* ======================================
 * BUILD 4 MISSIONS
 * ====================================== */

function buildMissionFields() {

  missionsContainer.innerHTML = '';

  for (
    let stage = 1;
    stage <= 4;
    stage++
  ) {

    const padded =
      String(stage)
        .padStart(2, '0');

    missionsContainer.insertAdjacentHTML(
      'beforeend',
      `
      <article class="mission-card">

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
            這是給送禮人藏實體任務卡的位置，
            不會直接顯示給壽星。
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
            多個可接受答案請使用「｜」分隔，
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
    () => {
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

}


/* ======================================
 * NAVIGATION
 * ====================================== */

function handleNext() {

  if (!validateCurrentStep()) {
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


  /*
   * Phase 03-C：
   * 下一階段會改成進入
   * 最終確認頁。
   */

  showToast(
    '資料已暫存完成 ✓ 下一階段接最終確認頁'
  );

}


function handleBack() {

  if (currentStep <= 1) {
    return;
  }

  currentStep--;

  updateStepUI();

  scrollToTop();

}


function updateStepUI() {

  document
    .querySelectorAll(
      '.form-step'
    )
    .forEach(step => {

      step.classList.toggle(
        'active',
        Number(step.dataset.step) ===
          currentStep
      );

    });


  stepLabel.textContent =
    `STEP ${
      String(currentStep)
        .padStart(2, '0')
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
      `.form-step[
        data-step="${currentStep}"
      ]`
    );

  const fields =
    [
      ...step.querySelectorAll(
        'input[required], textarea[required]'
      )
    ];


  for (const field of fields) {

    if (
      field.type === 'radio'
    ) {
      continue;
    }

    if (!field.checkValidity()) {

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


  const radioGroups =
    [
      ...new Set(
        fields
          .filter(
            field =>
              field.type === 'radio'
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
        `input[
          name="${name}"
        ]:checked`
      );

    if (!checked) {

      showToast(
        '請完成此頁的選擇'
      );

      const first =
        step.querySelector(
          `input[
            name="${name}"
          ]`
        );

      first
        ?.closest(
          '.choice-grid, .template-grid'
        )
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

      return false;

    }

  }


  if (currentStep === 1) {

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


  if (
    currentStep === 4 &&
    !photoInput.files.length
  ) {

    showToast(
      '請選擇生日卡照片'
    );

    photoInput
      .closest('.upload-box')
      .scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    return false;

  }


  return true;

}


/* ======================================
 * PHOTO PREVIEW
 * ====================================== */

function handlePhoto() {

  const file =
    photoInput.files[0];

  if (!file) {
    resetPhotoPreview();
    return;
  }


  if (
    ![
      'image/jpeg',
      'image/png',
      'image/webp'
    ].includes(file.type)
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


  reader.onload = event => {

    photoPreview.src =
      event.target.result;

    photoPreview.hidden =
      false;

    uploadEmpty.hidden =
      true;

  };


  reader.readAsDataURL(file);

}


function resetPhotoPreview() {

  photoPreview.src = '';
  photoPreview.hidden = true;

  uploadEmpty.hidden = false;

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


function collectDraftData() {

  const missions = [];

  for (
    let stage = 1;
    stage <= 4;
    stage++
  ) {

    missions.push({

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
      getValue('orderNo'),

    nickname:
      getValue('nickname'),

    birthdayDate:
      getValue('birthdayDate'),

    gameMode:
      getChecked(
        'gameMode'
      ),

    unlockTime:
      getValue('unlockTime'),

    rescueTime:
      getValue('rescueTime'),

    missions,

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

    setValue(
      'unlockTime',
      data.unlockTime
    );

    setValue(
      'rescueTime',
      data.rescueTime
    );

    setRadio(
      'gameMode',
      data.gameMode
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


    if (data.card) {

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
     * File 不能從 localStorage
     * 自動還原。
     */

  } catch (error) {

    console.error(
      'Draft restore failed:',
      error
    );

  }

}


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

  return (
    document
      .getElementById(id)
      ?.value
      ?.trim() ||
    ''
  );

}


function setValue(
  id,
  value
) {

  const el =
    document.getElementById(id);

  if (
    el &&
    value !== undefined &&
    value !== null
  ) {

    el.value = value;

  }

}


function getChecked(name) {

  return (
    document.querySelector(
      `input[
        name="${name}"
      ]:checked`
    )?.value ||
    ''
  );

}


function setRadio(
  name,
  value
) {

  if (!value) {
    return;
  }

  const radio =
    document.querySelector(
      `input[
        name="${name}"
      ][
        value="${CSS.escape(value)}"
      ]`
    );

  if (radio) {
    radio.checked = true;
  }

}


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
    ).padStart(2, '0');

  const dd =
    String(
      now.getDate()
    ).padStart(2, '0');

  input.min =
    `${yyyy}-${mm}-${dd}`;

}


function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


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


function debounce(
  fn,
  wait
) {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout =
      setTimeout(
        () =>
          fn(...args),
        wait
      );

  };

}
