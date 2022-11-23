const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Валерия",
            "id_4": "Анастасия",
            "id_5": "Дарья",
            "id_6": "Наталья",
            "id_7": "Марина",
            "id_8": "Диана",
            "id_9": "Елизавета",
            "id_10": "Анна"
        }
    }`,
    patronymicNameJson: `{
        "count": 10,
        "list": {     
            "id_1": "Юрьевич",
            "id_2": "Александрович",
            "id_3": "Валерьевич",
            "id_4": "Константинович",
            "id_5": "Николаевич",
            "id_6": "Михайлович",
            "id_7": "Егорьевич",
            "id_8": "Сергеевич",
            "id_9": "Алексеевич",
            "id_10": "Андреевич"
        }
    }`,
    professionsJson: `{
        "count": 21,
        "list": {
            "id_1": "слесарь",
            "id_2": "повар",
            "id_3": "шахтер",
            "id_4": "бухгалтер",
            "id_5": "программист",
            "id_6": "ювелир",
            "id_7": "сталевар",
            "id_8": "плотник",
            "id_9": "моляр",
            "id_10": "менеджер",
            "id_11": "учитель",
            "id_12": "слесарь авиадвигателя",
            "id_13": "машинист экскаватора",
            "id_14": "солдат",
            "id_15": "рекрутер",
            "id_16": "врач",
            "id_17": "фармацевт",
            "id_18": "технолог",
            "id_19": "актер",
            "id_20": "дизайнер",
            "id_21": "менеджер" 
        }
    }`,
    professionsForbiddenForWomen: `{
        "count": 6,
        "list": {
            "id_1": "слесарь",
            "id_2": "шахтер",
            "id_3": "сталевар",
            "id_4": "слесарь авиадвигателя",
            "id_5": "машинист экскаватора",
            "id_6": "солдат"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomGender: function () {
        return this.randomIntNumber() === 0 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    randomBirthDate: function () {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const year = this.randomIntNumber(new Date().getFullYear(), 1940);
        const month = this.randomIntNumber(11, 0);
        const day = this.randomIntNumber(31, 1);
        const date = new Date(year, month, day);

        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    randomFirstName: function () {
        if (this.person.gender === this.GENDER_FEMALE) {
            return this.randomValue(this.firstNameFemaleJson);
        } else {
            return this.randomValue(this.firstNameMaleJson);
        }
    },
    // генерация отчества
    randomPatronymicName: function () {
        let patronymic = this.randomValue(this.patronymicNameJson);

        if (this.person.gender === this.GENDER_FEMALE) {
            return patronymic.substring(0, patronymic.length - 2) + 'на';
        }

        return patronymic;
    },

    randomSurname: function () {
        let surname = this.randomValue(this.surnameJson);

        if (this.person.gender === this.GENDER_FEMALE) {
            surname += 'а';
        }

        return surname;
    },
    //функция с проверкой допустимости женщины на сгенерированную профессию
    randomProfession: function () {
        let profession = this.randomValue(this.professionsJson);
        const forbiddenProfessions = JSON.parse(this.professionsForbiddenForWomen);
        const forbiddenProfessionsArray = Object.values(forbiddenProfessions.list);

        if (
            this.person.gender === this.GENDER_FEMALE &&
            forbiddenProfessionsArray.includes(profession)
        ) {
            return this.randomProfession();
        };

        return profession;
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.birthDate = this.randomBirthDate();
        this.person.firstName = this.randomFirstName();
        this.person.surname = this.randomSurname();
        this.person.patronymicName = this.randomPatronymicName();
        this.person.professions = this.randomProfession();

        return this.person;
    },
}
