const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

class NameGenerator
{


    async generateName() {
        try {
            const randoName = await Promise.all([uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: '-',
                length: 3
            })]);

            return randoName;

        } catch (error) {
            console.error('Unable to generate name:', error);
        }

    }
}
module.exports = NameGenerator;