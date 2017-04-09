// http://learnjsdata.com/group_data.html
// http://bl.ocks.org/phoebebright/raw/3176159/

d3.csv("/csv/titanic.csv", function(error, data) {
  for (let d of data) {
    d.lastName = d.Name.split(",")[0];
    d.title = d.Name.split(" ")[1];
  }

  let survival = d3.nest()
    .key((d)=>{return d.Survived})
    .entries(data)
  let classes = d3.nest()
    .key((d)=>d.Pclass)
    .entries(data);
  let gender = d3.nest()
    .key((d)=>d.Sex)
    .entries(data);
  let embarked = d3.nest()
    .key((d)=>d.Embarked)
    .entries(data);
  let age = d3.nest()
    .key((d)=>d.Age)
    .entries(data);
  let class_geo = d3.nest()
    .key((d)=>d.Pclass)
    .key((d)=>d.Embarked)
    .entries(data);

  let fare_class = d3.nest()
    .key((d) => d.Pclass)
    .rollup((v) => d3.mean(v, (d) => d.Fare))
    .object(data);

  let survival_chance_class = d3.nest()
    .key((d) => d.Pclass)
    .rollup((v) => d3.mean(v, (d) => d.Survived))
    .object(data);

  let survival_chance_sex = d3.nest()
    .key((d) => d.Sex)
    .rollup((v) => d3.mean(v, (d) => d.Survived))
    .object(data);

  let class_age = d3.nest()
    .key((d) => d.Pclass)
    .rollup((v) => d3.mean(v, (d) => d.Age))
    .object(data);

  let sex_age = d3.nest()
    .key((d) => d.Sex)
    .rollup((v) => d3.mean(v, (d) => d.Age))
    .object(data);

  let class_metrics = d3.nest()
    .key((d)=>d.Pclass)
    .rollup((v) => {
        return {
          avg_age: d3.mean(v, (d) => d.Age),
          avg_fare: d3.mean(v, (d) => d.Fare),
          total_fare: d3.sum(v, (d) => d.Fare),
          survival_chance: d3.mean(v, (d) => d.Survived),
          m_count: d3.sum(v,(d) => {
                  if (d.Sex == "male") {
                          return 1;
                  }
          }),
          f_count: d3.sum(v,(d) => {
                  if (d.Sex == "female") {
                          return 1;
                  }
          }),   
          m_perc: d3.sum(v,(d) => {
                  if (d.Sex == "male") {
                          return 1;
                  }
          }) / v.length,
          f_perc: d3.sum(v,(d) => {
                  if (d.Sex == "female") {
                          return 1;
                  }
          }) / v.length,     
        }
    })
    .object(data)

    let class_by_fare = d3.nest()
      .key((d)=>d.Pclass)
      .sortValues(function(a,b) { return parseFloat(a.Fare) - parseFloat(b.Fare); })
      .object(data)

    let lastnames = d3.nest()
      .key((d)=>d.lastName)
      .rollup((v) => {
          return {
            survival_chance: d3.mean(v, (d) => d.Survived),
            family_size: v.length,
            class: d3.mean(v, (d) => d.Pclass)
          }
      })
      .object(data)
    
    let titles = d3.nest()
      .key((d)=>d.title)
      .rollup((v) => {
          return {
            avg_age: d3.mean(v, (d) => d.Age),
            avg_fare: d3.mean(v, (d) => d.Fare),
            total_fare: d3.sum(v, (d) => d.Fare),
            survival_chance: d3.mean(v, (d) => d.Survived),
            m_count: d3.sum(v,(d) => {
                    if (d.Sex == "male") {
                            return 1;
                    }
            }),
            f_count: d3.sum(v,(d) => {
                    if (d.Sex == "female") {
                            return 1;
                    }
            }),   
            m_perc: d3.sum(v,(d) => {
                    if (d.Sex == "male") {
                            return 1;
                    }
            }) / v.length,
            f_perc: d3.sum(v,(d) => {
                    if (d.Sex == "female") {
                            return 1;
                    }
            }) / v.length,     
          }
      })
      .object(data)

      for (let d of data) {
        d.familySize = lastnames[d.lastName].family_size;
      }

      let familysizes = d3.nest()
        .key((d)=>d.familySize)
        .rollup((v)=> {
          return {
            class: d3.mean(v, (d) => d.Pclass),
            survival_chance: d3.mean(v, (d) => d.Survived),
            avg_fare: d3.mean(v, (d) => d.Fare),
            occurences: v.length
          }
        })
        .object(data)
      console.log(familysizes);

// Lodash

// _.compact(array) - Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
// _.join(array, [separator=','])
// _.nth(array, [n=0]) - Gets the element at index n of array. If n is negative, the nth element from the end is returned.
// _.pull(array, [values]) - Removes all given values from array using SameValueZero for equality comparisons.
// _.uniq(array)
// _.zip([arrays]) - Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
// _.countBy(collection, [iteratee=_.identity]) - Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The iteratee is invoked with one argument: (value).
// _.filter(collection, [predicate=_.identity])
// _.find(collection, [predicate=_.identity], [fromIndex=0])
// _.groupBy(collection, [iteratee=_.identity]) - 
// _.includes(collection, value, [fromIndex=0]) - Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end of collection.
// _.map(collection, [iteratee=_.identity])
// _.orderBy(collection, [iteratees=[_.identity]], [orders])
// _.reduce(collection, [iteratee=_.identity], [accumulator])
// _.sortBy(collection, [iteratees=[_.identity]])
// _.findKey(object, [predicate=_.identity])
// _.forIn(object, [iteratee=_.identity])
// _.forOwn(object, [iteratee=_.identity])
// _.has(object, path)
// _.keys(object)
// _.mapKeys(object, [iteratee=_.identity])
// _.mapValues(object, [iteratee=_.identity])
// _.merge(object, [sources])
// _.values(object)
// _.trim()
// _.chain(value)
// _.split([string=''], separator, [limit])
//_.times(n, [iteratee=_.identity])
// _.template([string=''], [options={}])
// _.words([string=''], [pattern])
// var personsNamedBob = _.where( persons, { name : 'Bob' } );

})