function deleteCat(catId) {
  database
    .delete('cats', catId)
    //.delete returns a promise.
    .then(() => console.log('Cat deleted'))
    //crash reporting
    .catch((err) => console.error('Error deleting cat', err));
}

//This will alert devs and testers but NOT USERS
//we need deleteCAt to notify it's higher level code.
//this is using promises as glorified callbacks and not making use of

//this does not swallow the error.
function deleteCat(catId) {
  return database.delete('cats', catId);
}

//this lives in the UI layer now.
function deleteButtonClickHandler(e) {
  const catId = e.target.data['cat-id'];
  deleteCat(catId)
    .then(() => removeItemElementFromPage(catId))
    .catch((err) =>
      showMessageDialog('item ' + getCatName(catId) + ' was not deleted')
    );
}
