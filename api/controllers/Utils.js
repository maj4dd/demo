export default class Utils {
    static padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }
  
    static formatDate(date) {
      return (
        [
          date.getFullYear(),
          Utils.padTo2Digits(date.getMonth() + 1),
          Utils.padTo2Digits(date.getDate()),
        ].join("-") +
        " " +
        [
          Utils.padTo2Digits(date.getHours()),
          Utils.padTo2Digits(date.getMinutes()),
          Utils.padTo2Digits(date.getSeconds()),
        ].join(":")
      );
    }
  }