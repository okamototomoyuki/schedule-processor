<script>
  import { onMount } from "svelte";
  import { firebase } from "firebase";
  import { dotenv } from "dotenv";

  const _FS_COL = "todos";

  let docRef = null;

  // WebView2 活性時
  window["OnActive"] = async () => {
    domText.focus();
  };

  onMount(async () => {
    firebase.initializeApp({
      apiKey: "AIzaSyCwQsSxjN8cwrj4oKLWVyx4FmHxtlKb_z0",
      authDomain: "todo-abc60.firebaseapp.com",
      projectId: "todo-abc60",
    });

    const pId = new URL(location.href).searchParams.get("id");

    if (pId === null) {
      alert("ID が入力されていません");
      return;
    }

    const fs = firebase.firestore();
    docRef = fs.collection(_FS_COL).doc(pId);
  });

  const _fetchHoliday = async () => {
    const res = await fetch("https://holidays-jp.github.io/api/v1/date.json");
    holidayDic = await res.json();
  };

  const _fetchDoc = async () => {
    let doc = await docRef.get();
    content = new Content();
    if (doc.exists) {
      content.load(doc.data().content);
    }
  };
</script>

<main>
  <div class="container">
    <div class="header">
      作業
      <label><input type="number" class="hpd" />時/日</label>
      <label><input type="checkbox" class="wk-w" />平日</label>
      <label><input type="checkbox" class="wk-h" />休日</label>
    </div>
    <div class="blank">
      <div>✔</div>
      <div />
    </div>
    <div class="days">
      <div class="month">
        <div>1</div>
      </div>
      <div class="day">
        <div>11</div>
        <div>11</div>
        <div>11</div>
      </div>
    </div>
    <div class="keys">
      <div class="text">
        <textarea wrap="off" />
      </div>
      <div><input type="checkbox" /></div>
      <div><input type="checkbox" /></div>
      <div><input type="checkbox" /></div>
      <div><input type="checkbox" /></div>
    </div>
    <div class="datas">
      <div class="row">
        <div>●</div>
        <div>●</div>
        <div>●</div>
        <div>●</div>
        <div>●</div>
      </div>
      <div class="row">
        <div>●</div>
        <div>●</div>
        <div>●</div>
        <div>●</div>
        <div>●</div>
      </div>
    </div>
  </div>
</main>

<style>
  :root {
    --cell-height: 1.625em;
    --cell-width: 25px;
  }

  .container {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 300px 1fr;
    grid-template-rows: var(--cell-height) calc(var(--cell-height) * 2) 1fr;
  }

  .header {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    display: block;
    width: 100%;
    height: 100%;
    text-align: right;
  }

  .blank,
  .keys {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-auto-rows: var(--cell-height);
    overflow: hidden;
  }

  .keys .text {
    grid-column: 2 / 3;
    grid-row-start: 1;
    grid-row-end: 5;
  }

  .keys div:not(.text) {
    height: var(--cell-height);
  }

  .days {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .days .month,
  .days .day {
    display: flex;
    flex-flow: row nowrap;
  }

  .month div,
  .days div {
    flex-basis: var(--cell-width);
    flex-shrink: 0;
    height: 100%;
    color: #fff;
  }

  .datas {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .datas .row {
    display: flex;
    flex-flow: row nowrap;
    height: var(--cell-height);
    overflow: visible;
  }

  .datas .row div {
    flex-basis: var(--cell-width);
    flex-shrink: 0;
    height: var(--cell-height);
  }

  .keys textarea {
    resize: none;
    width: 100%;
    height: 100%;
    line-height: 1.5em;
    font-size: 1.35em;
  }

  .keys input {
    width: 95%;
    height: 95%;
  }

  div {
    text-align: center;
    vertical-align: middle;
    line-height: var(--cell-height);
    box-sizing: border-box;
  }

  input.hpd {
    width: 45px;
  }
</style>
