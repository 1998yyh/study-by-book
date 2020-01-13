function Factory(name, age, carceer) {
  let work;
  switch (carceer) {
    case 'coder':
      work = ['写代码', '写Bug', '改Bug']
      break;
    case 'product manger':
      work = ['不知道干啥的']
      break;
    case 'xxx':
      work = ''
      break;
  }

  return new User(name,age,career,work)
}

function User(name,age,career){
  this.name = name;
  this.age = age;
  this.career = career;
}