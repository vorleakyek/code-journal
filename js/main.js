const photoUrl = document.querySelector('#photo-url');
const imgPreview = document.querySelector('.img-preview');
const button = document.querySelector('#btn');
const title = document.querySelector('#title');
const notes = document.querySelector('#notes');
const form = document.querySelector('#form');
const ul = document.querySelector('.list-entries');
const entriesLink = document.querySelector('.enties-link');
const newButton = document.querySelector('#btn-new-entry');
const entryForm = document.querySelector('[data-view="entry-form"]');
const entryPage = document.querySelector('[data-view="entries"]');
const formHeader = document.querySelector('.form-header');

photoUrl.addEventListener('input', photoPreview);
button.addEventListener('click', submitForm);
entriesLink.addEventListener('click', function (event) { viewSwap('entries'); });
newButton.addEventListener('click', newButtonClick);
document.addEventListener('DOMContentLoaded', loadAllEntries);
ul.addEventListener('click', edit);

function newButtonClick(event) {
  form.reset();
  formHeader.textContent = 'New Entry';
  imgPreview.src = 'images/placeholder-image-square.jpg';
  data.editing = null;
  viewSwap('entry-form');
}

function edit(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  viewSwap('entry-form');
  const closestLi = event.target.closest('[data-entry-id]');
  const closestLiValue = parseInt(closestLi.getAttribute('data-entry-id'));
  const matchObj = data.entries.find(obj => obj.entryId === closestLiValue);

  data.editing = matchObj;
  title.value = matchObj.title;
  photoUrl.value = matchObj.imgUrl;
  notes.value = matchObj.notes;
  imgPreview.setAttribute('src', photoUrl.value);
  formHeader.textContent = 'Edit Entry';
}

function photoPreview(event) {
  const inputUrl = event.target.value;
  if (photoUrl.checkValidity()) {
    imgPreview.src = inputUrl;
  } else {
    imgPreview.src = 'images/placeholder-image-square.jpg';
  }
}

function submitForm(event) {
  if (!title.checkValidity() || !photoUrl.checkValidity() || !notes.checkValidity()) {
    return;
  }

  event.preventDefault();

  if (data.editing === null) {
    const dataObj = {
      title: title.value,
      imgUrl: photoUrl.value,
      notes: notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.push(dataObj);
    ul.prepend(renderEntry(dataObj));
  } else {
    const dataObjedit = {
      title: title.value,
      imgUrl: photoUrl.value,
      notes: notes.value,
      entryId: data.editing.entryId
    };
    data.entries.splice(data.editing.entryId - 1, 1, dataObjedit);
    const replacedLi = document.querySelector(`[data-entry-id = "${data.editing.entryId}"]`);
    replacedLi.replaceWith(renderEntry(dataObjedit));
    formHeader.textContent = 'New Entry';
    data.editing = null;
  }

  imgPreview.src = 'images/placeholder-image-square.jpg';
  form.reset();
  viewSwap('entries');

  if (data.entries.length === 1) {
    toggleNoEntries();
  }
}

function renderEntry(entry) {
  const newLi = document.createElement('li');
  newLi.setAttribute('data-entry-id', entry.entryId);
  ul.prepend(newLi);
  const newDiv1 = document.createElement('div');
  newDiv1.setAttribute('class', 'row');
  newLi.append(newDiv1);
  const newDiv2 = document.createElement('div');
  newDiv2.className = 'column-full column-half';
  newDiv1.append(newDiv2);
  const img = document.createElement('img');
  img.setAttribute('src', entry.imgUrl);
  newDiv2.append(img);
  const newDiv3 = document.createElement('div');
  newDiv3.className = 'column-full column-half';
  newDiv1.append(newDiv3);
  const newDiv4 = document.createElement('div');
  newDiv4.className = 'flex';
  newDiv3.append(newDiv4);
  const newh2 = document.createElement('h2');
  newh2.textContent = entry.title;
  newh2.classList.add('no-margin');
  newDiv4.append(newh2);
  const newi = document.createElement('i');
  newi.className = 'fa-solid fa-pencil edit-icon';
  newDiv4.append(newi);
  const newpara = document.createElement('p');
  newpara.textContent = entry.notes;
  newpara.classList.add('pre-wrap');
  newDiv3.append(newpara);
  return newLi;
}

function loadAllEntries(event) {
  if (data.entries.length === 0) {
    const newLi = document.createElement('li');
    ul.append(newLi);
    const newPara = document.createElement('p');
    newPara.className = 'center no-data';
    newPara.textContent = 'No entries have been recorded.';
    newLi.append(newPara);
  }

  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }

  viewSwap(data.view);

  if (data.entries === 0) {
    toggleNoEntries();
  }
}

function toggleNoEntries() {
  const noData = document.querySelector('.no-data');
  noData.classList.toggle('hidden');
}

function viewSwap(dataView) {
  if (dataView === 'entry-form') {
    entryForm.classList.remove('hidden');
    entryPage.setAttribute('class', 'hidden');
    data.view = dataView;

    if (data.editing !== null) {
      title.value = data.editing.title;
      photoUrl.value = data.editing.imgUrl;
      notes.value = data.editing.notes;
      imgPreview.setAttribute('src', data.editing.imgUrl);
      formHeader.textContent = 'Edit Entry';
    }

  } else if (dataView === 'entries') {
    entryPage.classList.remove('hidden');
    entryForm.setAttribute('class', 'hidden');
    data.view = dataView;
  }
}
