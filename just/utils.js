export function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1); // Removes the item at the found index
  }
}
