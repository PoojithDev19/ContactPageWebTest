const BASE_URL = process.env.MEDAVIE_BASE_URL || 'https://www.medavie.ca';

const contactData = Object.freeze({
  english: Object.freeze({
    url: `${BASE_URL}/en/`,
    contactPath: '/en/contact',
    pageTitle: 'Contact',
    contacts: [
      { region: 'Atlantic Region', number: '1-888-227-3400' },
      { region: 'Quebec', number: '1-888-588-1212' },
      { region: 'Ontario', number: '1-800-355-9133' },
      { region: 'Elsewhere in Canada', number: '1-800-667-4511' },
    ],
  }),
  french: Object.freeze({
    url: `${BASE_URL}/fn/`,  //Bug fix needed here
    contactPath: '/fn/coordonnees', //Bug fix needed here
    pageTitle: 'Coordonnées',
    contacts: [
      { region: 'Région de l’Atlantique', number: '1-888-227-3400' },
      { region: 'Québec', number: '1-888-588-1212' },
      { region: 'Ontario', number: '1-800-355-9133' },
      { region: 'Ailleurs au Canada', number: '1-800-667-4511' },
    ],
  }),
});

module.exports = { contactData };
