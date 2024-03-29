function checkMatch(event) {
  isMessageDisplayed = document.getElementById('success').style.display === 'block' || document.getElementById('failure').style.display === 'block';

  if (isMessageDisplayed) {
    return;
  }

  event.currentTarget.classList.add('selected');
  var selectedItems = document.getElementsByClassName('selected');

  if (selectedItems.length > 1) {
    var isMatch = selectedItems[0].name === selectedItems[1].name
    console.log(isMatch);
    if (isMatch) {
      document.getElementById('success').style.display = 'block';

      successMessage = document.getElementById('success').innerHTML;

      document.getElementById('success').innerHTML = document.getElementById('success').innerHTML + selectedItems[0].name;

      setTimeout(() => {
        document.getElementById('success').style.display = 'none'; document.getElementById('success').innerHTML = successMessage;

        selectedItems[0].classList.add('matched');
        selectedItems[1].classList.add('matched');
        selectedItems[0].classList.remove('selected');
        selectedItems[0].classList.remove('selected');
        ;
      }, '2500');

    }
    else {
      document.getElementById('failure').style.display = 'block';
      selectedItems[0].classList.add('incorrect');
      selectedItems[1].classList.add('incorrect');
      setTimeout(() => {
        document.getElementById('failure').style.display = 'none';

        selectedItems[0].classList.remove('incorrect');
        selectedItems[1].classList.remove('incorrect');
        selectedItems[0].classList.remove('selected');
        selectedItems[0].classList.remove('selected');

      }, '2500');

    }
  }
}
