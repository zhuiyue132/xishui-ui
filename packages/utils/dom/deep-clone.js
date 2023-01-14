// 可遍历类型
const arrType = '[object Array]';
const objType = '[object Object]';
const mapType = '[object Map]';
const setType = '[object Set]';
const argType = '[object Arguments]';

// 不可遍历
const boolType = '[object Boolean]';
const numType = '[object Number]';
const strType = '[object String]';
const dateType = '[object Date]';
const regexpType = '[object Regexp]';
const symbolType = '[object Symbol]';
const funType = '[object Function]';

// 将可遍历类型做个集合
const traverseTypes = [arrType, objType, mapType, setType, argType];
const isObject = obj => {
  const type = typeof obj;
  return obj !== null && (type === 'object' || type === 'function');
};

const getObjectType = obj => {
  return Object.prototype.toString.call(obj);
};

// 克隆正则
const cloneRegexp = obj => {
  const { resource, flags, lastIndex } = obj;
  const obj_ = new Regexp(resource, flags);
  obj_.lastIndex = lastIndex;
  return obj_;
};

// 拷贝不便于遍历的对象类型
const cloneOtherType = (obj, type) => {
  switch (type) {
    case boolType:
    case numType:
    case strType:
    case dateType:
      return new obj.constructor(obj.valueOf());
    case symbolType:
      return Object(obj.valueOf());
    case regexpType:
      return cloneRegexp(obj);
    case funType:
      return obj;
  }
};

export const deepClone = (obj, map = new Map()) => {
  // 如果不是对象直接返回
  if (!isObject(obj)) {
    return obj;
  }

  // 获取当前参数的对象类型
  const objType = getObjectType(obj);

  // 根据constructor找到原始构造器，创建初始化对象
  let obj_;
  if (traverseTypes.includes(objType)) {
    // 如果是可遍历类型，直接创建空对象
    obj_ = new obj.constructor();
  } else {
    // 若不是，则走额外的处理
    return cloneOtherType(obj, objType);
  }

  // 解决循环引用问题
  if (map.has(obj)) {
    return map.get(obj);
  }
  // 存储当前拷贝的对象，以及我们要返回的对象
  map.set(obj, obj_);

  // 拷贝Set
  if (objType === setType) {
    obj.forEach(val => {
      obj_.add(deepClone(val, map));
    });
    return obj_;
  }

  // 拷贝Map
  if (objType === mapType) {
    obj.forEach((val, key) => {
      obj_.set(key, deepClone(val, map));
    });
    return obj_;
  }

  // 如果是数组或者{}
  for (let i in obj) {
    // 不管是不是对象，直接递归，外面的typeof会帮我们做判断是否要继续遍历
    obj_[i] = deepClone(obj[i], map);
  }
  return obj_;
};
