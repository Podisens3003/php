
function generatePerson(e, isEmpty) {
    let initPerson;

    if (!isEmpty) {
        initPerson = personGenerator.getPerson();
    }

    document.getElementById('firstNameOutput').innerText = isEmpty ? '-' : initPerson.firstName;
    document.getElementById('surnameOutput').innerText = isEmpty ? '-' : initPerson.surname;
    document.getElementById('genderOutput').innerText = isEmpty ? '-' : initPerson.gender;
    document.getElementById('birthYearOutput').innerText = isEmpty ? '-' : initPerson.birthDate;
    document.getElementById('patronymicNameOutput').innerText = isEmpty ? '-' : initPerson.patronymicName;
    document.getElementById('professionsOutput').innerText = isEmpty ? '-' : initPerson.professions;
};

window.onload = generatePerson();
document.querySelector('.start').addEventListener('click', generatePerson);
document.querySelector('.clear').addEventListener('click', (e) => generatePerson(e, true));