function create(constructor, ...args) {
    const obj = Object.create(constructor.prototype)

    const res = constructor.apply(obj, args)

    return (typeof res === 'object' && res !== null) ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function() {
  console.log(this.name, this.age);
};

const p = create(Person, 'x', 18)

p.say()
