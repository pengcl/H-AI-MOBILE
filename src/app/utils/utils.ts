import {of as observableOf} from 'rxjs';

export function isCn(str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false;
  }
  return true;
}

export function formData(body: object): FormData {
  const form: FormData = new FormData();
  for (const kn in body) {
    if (body) {
      form.append(kn, body[kn] === undefined ? '' : body[kn]);
    }
  }
  return form;
}

export function formDataToUrl(body: object, ifFist?: boolean): string {
  let str = '';
  for (const keyName in body) {
    if (!str && ifFist) {
      str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    } else {
      str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    }
  }
  return str;
}

export function getIndex(arr, key, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return i;
    }
  }
}

export function resultProcess(res) {
  if (res.code === '0000') {
    return observableOf(res.result);
  } else {
    return observableOf(null);
  }
}


