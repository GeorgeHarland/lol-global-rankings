 export function snakeToCamel(obj: any): any {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map((item) => snakeToCamel(item));
    }
  
    const camelObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, function (match, letter) {
          return letter.toUpperCase();
        });
        camelObj[camelKey] = snakeToCamel(obj[key]);
      }
    }
  
    return camelObj;
  }