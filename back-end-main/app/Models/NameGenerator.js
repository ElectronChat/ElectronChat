
require('isomorphic-fetch');
class NameGenerator
{

    async fetchData(url) {
        try {
            console.log(url);
            const response = await fetch(url).then(function(response){
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
                
            });
            return response;
        } catch (error) {
            console.error('Unable to fetch data:', error);
        }
    }

fetchNames(nameType) {

    return this.fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
}

pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

async generateName(gender) {
    try {
        const response = await Promise.all([
            this.fetchNames(gender || this.pickRandom(['male', 'female'])),
            this.fetchNames('surnames')
          ]);
      
          const [firstNames, lastNames] = response;
      
          const firstName = this.pickRandom(firstNames.data);
          const lastName = this.pickRandom(lastNames.data);
      
          return `${firstName} ${lastName}`;
        } catch (error) {
          console.error('Unable to generate name:', error);
        }
      
}
}
module.exports = NameGenerator;