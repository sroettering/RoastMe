import { Meteor } from 'meteor/meteor';

class Seeder {
  constructor(collectionName, options) {
    if(!collectionName || !options) {
      throw new Error('Wrong Seeder usage! Please supply a collection name and some options.');
    } else {
      this.collection = this.getCollection(collectionName);
      this.options    = options;

      if(typeof this.collection !== 'undefined') {
        this.seed();
      } else {
        throw new Error(`Could not find a collection called "${collectionName}"`);
      }
    }
  }

  getCollection(collectionName) {
    return collectionName === 'Users' ? Meteor.users : Mongo.Collection.get(collectionName);
  }

  seed() {
    const options = this.options,
          data    = options.data,
          model   = options.model;

    if(data && !model) this.sow(data);
    if(model && !data) this.sow(model);
  }

  sow(data) {
    const isDataArray        = data instanceof Array,
          loopLength         = isDataArray ? data.length : this.options.num,
          hasData            = this.options.ignoreExistingData ? false : this.checkForExistingData(),
          collectionName     = this.collection._name,
          isUsers            = collectionName === 'users',
          environmentAllowed = this.environmentAllowed();

    if(!hasData && environmentAllowed) {
      for(let i = 0; i < loopLength; i++) {
        let value = isDataArray ? data[i] : data(i);

        if(!isUsers) {
          this.collection.insert(value);
        } else {
          console.log('Seeding users is not supported!');
        }
      }
    }

    if(hasData) {
      console.log(`The ${collectionName} collection already contains data!`);
    }
    if(!environmentAllowed) {
      console.log(`Seeding in ${process.env.NODE_ENV} is not allowed!`);
    }
  }

  checkForExistingData() {
    let existingCount = this.collection.find().count();
    return this.options.num ? existingCount >= this.options.num : existingCount > 0;
  }

  environmentAllowed() {
    let environments = this.options.environments;

    if(environments) {
      return environments.indexOf(process.env.NODE_ENV) > -1;
    } else {
      return true;
    }
  }
}

export default Seed = (collection, options) => {
  return new Seeder(collection, options);
}
