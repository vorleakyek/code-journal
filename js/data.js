/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previousData = localStorage.getItem('code journal');

window.addEventListener('beforeunload', function (event) {
  const jsonString = JSON.stringify(data);
  this.localStorage.setItem('code journal', jsonString);
});

if (previousData !== null) {
  data = JSON.parse(previousData);
}
