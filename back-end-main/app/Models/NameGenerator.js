const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');

class NameGenerator
{


    async generateName() {
        try {
            const chungus = ['chungus'];
            const randoName = await Promise.all([uniqueNamesGenerator({
                dictionaries: [adjectives,chungus],
                separator: '_',
                length: 2,
                style: 'uppercase'

            })]);

            return randoName;

        } catch (error) {
            console.error('Unable to generate name:', error);
        }

    }
}
module.exports = NameGenerator;