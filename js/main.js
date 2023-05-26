const photoUrl = document.querySelector('#photo-url');
const imgPreview = document.querySelector('.img-preview');
const button = document.querySelector('#btn');
const title = document.querySelector('#title');
const notes = document.querySelector('#notes');
const form = document.querySelector('#form');

photoUrl.addEventListener('input', photoPreview);
button.addEventListener('click', submitForm);

function photoPreview(event) {
  const inputUrl = event.target.value;
  imgPreview.src = inputUrl;
}

function submitForm(event) {
  event.preventDefault();
  const dataObj = {
    title: title.value,
    imgUrl: photoUrl.value,
    notes: notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(dataObj);
  imgPreview.src = 'images/placeholder-image-square.jpg';
  form.reset();
}
