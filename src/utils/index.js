export const isValidatorPhone = (phone) => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phone.match(regex);
};
export const isValidatorEmail = (email) => {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  return !!email.match(email.match(regex));
};

export const isValidatorName = (name) => {
  const regex = /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
  return !!name.match(regex)
};


export const isValidatorCCCD = (number)=>{
  const regex = "^[0-9]+$"
  if(number.length ===12){
    return number.match(regex)
  }
  else{
    return false
  }
  
}
export const isValidatorUrl = (url) => {
  const regex = /(rtsp):\/\/([^\s@/]+)@([^\s/:]+)(?::([0-9]+))?(\/.*)/;
  if (url) {
    return url.match(regex);
  } else {
    return false;
  }
};
export const SizeOfElement = (element) => {
  if (element) {
    let { width, height, top, right, bottom, left } =
      element.getBoundingClientRect();
    let parentHeight = document.body.offsetHeight;
    let parentWidth = document.body.offsetWidth;
    let parentFullHeight = document.body.scrollHeight;
    let parentFullWidth = document.body.scrollWidth;
    let scrollHeight = element.scrollHeight;
    let scrollWidth = element.scrollWidth;

    return {
      width: width,
      height: height,
      elementTop: top,
      elementBottom: parentHeight - bottom,
      elementRight: parentWidth - right,
      elementLeft: left,
      screenHeight: parentHeight,
      screenWidth: parentWidth,
      htmlWidth: parentFullWidth,
      htmlHeight: parentFullHeight,
      scrollHeight: scrollHeight,
      scrollWidth: scrollWidth,
    };
  }
};

export const isValidatePassword = (password) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{11,}$/;
  return !!password.match(regex);
}
export const isValidateConfirm = (oldVar, newVar) => {
  return !!oldVar.match(newVar)
}
export const formatDate = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate()
  return (year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day));
}

export const formatDateToTime = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate();
  const hour = dateA.getHours();
  const minute = dateA.getMinutes();
  return ((month <= 9 ? '0' + month : month) + '/' + (day <= 9 ? '0' + day : day) + '/' + year + ' - ' + (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute))
}
export const isValidateUserName = (data) => {
  const regex = /^[a-z0-9_-]{3,15}$/
  return !!data.match(regex)
}
export const format = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate()
  return (year + '-' + month + '-' + + day);
}
export const formatDDMMYY = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1 < 10 ? '0' + (dateA.getMonth() + 1) : dateA.getMonth() + 1
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate()
  return (day + '-' + month + '-' + year);
}
export const increYear = (date)=>{
  const dateA = new Date(date);
  const year = dateA.getFullYear()+1;
  const month = dateA.getMonth() + 1 < 10 ? '0' + (dateA.getMonth() + 1) : dateA.getMonth() + 1
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate()
  return (day + '-' + month + '-' + year);
}
export const formatYYMMDD = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1 < 10 ? '0' + (dateA.getMonth() + 1) : dateA.getMonth() + 1
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate()
  return (year + '-' + month + '-' + day);
}
export const formatHour = (date) => {
  const dateA = new Date(date);
  const hour = dateA.getHours() < 10 ? '0' + dateA.getHours() : dateA.getHours()
  const minute = dateA.getMinutes() < 10 ? '0' + dateA.getMinutes() : dateA.getMinutes()
  console.log(dateA.getMinutes() < 10);
  return (hour + ':' + minute)
}
export const checkValidatorSubmit = (select = [], regexInput, input = []) => {
  const check = select.every(item => item !== "Lựa chọn" && item !== null && item !== undefined && item !== '')
  const checkInput = input.length > 0 ? input.every(item => item !== '' || item === undefined || item === null) : false
  if (check && regexInput && checkInput) {
    return true
  }
  return false
}

export const formatTimeHHMMSS = (time) => {
  const date = new Date(time);
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return hour + ':' + minute + ':' + second;
}
const parseDate = (str) => {
  const [month, day, year] = str.split('-');
  return new Date(year, month - 1, day);
}

const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60));
}
const parseMinute = (time) => {
  const [hour, minute] = time.split(":")
  return Number(hour * 60) + Number(minute)
}
export const countTime = (start, end) => {
  console.log((parseMinute(start.split(" ")[1]) - parseMinute(end.split(" ")[1])));
  if (parseMinute(start.split(" ")[1]) > parseMinute(end.split(" ")[1])) {
    return datediff(parseDate(start.split(" ")[0]), parseDate(end.split(" ")[0])) + (parseMinute(start.split(" ")[1]) - parseMinute(end.split(" ")[1]))
  }
  else {
    return datediff(parseDate(start.split(" ")[0]), parseDate(end.split(" ")[0])) - (parseMinute(start.split(" ")[1]) - parseMinute(end.split(" ")[1]))
  }

}

export const isValidatorVisaMasterCard = (number) => {
  const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/
  return !!number.match(regex)
}