
/**
 * Infracamp's Kasimir Http Request
 *
 * Ajax Request library
 *
 * Repository: https://github.com/kasimirjs/kasmimir-http-request
 *
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */
/**
 * Build a query string from an object
 *
 * <example>
 *     ka_build_query_str({var1: "val1", var2: "val2"});
 *
 *     Will return: "var1=val1&var2=val2"
 * </example>
 *
 * @param {object} input
 * @return String
 */
function ka_build_query_str(input) {
    let esc = encodeURIComponent;
    return Object.keys(input)
        .map(key => esc(key) + "=" + esc(input[key]))
        .join("&");
}
/**
 * Decode a query string (abc=val&var2=val2) into an object
 *
 * <example>
 * </example>
 *
 * @param {String} query
 * @return {Object}
 */
function ka_parse_query_str(query) {
    let vars = query.split("&");
    let ret = {};
    for (let comp of vars) {
        if (comp === "")
            continue;
        let pair = comp.split("=");
        ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return ret;
}
/**
 * Check if parameter 1 is undefined, null, empty string or empty array
 *
 * @param val
 * @return {boolean}
 */
function ka_empty (val) {
    return typeof val === "undefined" || val === null || val === "" || (Array.isArray(val) && val.length === 0);
}



function ka_interval(name, fn, interval) {

}


class KaInterval {

    setActive(active) {

    }

    isActive() {

    }
}


class KaRoute {

    constructor() {
        this.__options = {};
    }



    /**
     *
     * @return {{}}
     */
    static get options () {
        if (typeof this.prototype.__options === "undefined")
            this.prototype.__options = ka_parse_query_str(location.hash.slice(1));

        let timeout = null;
        let handler = {
            set: (target, property, value, receiver) => {
                target[property] = value;

                // Debounce updates (allow multiple updates before route change)
                if (timeout !== null) {
                    window.clearTimeout(timeout);
                    timeout = null;
                }

                timeout = window.setTimeout(e => {
                    location.hash = ka_build_query_str(this.prototype.__options);
                }, 10);

                return true;
            },
            get: (target, key) => {
                if (typeof target[key] === "object" && target[key] !== null)
                    return new Proxy(target[key], handler);
                return target[key];
            }

        };
        return new Proxy(this.prototype.__options, handler);
    }

    static set options (value) {
        this.prototype.__options = value;
        location.hash = ka_build_query_str(this.prototype.__options);
    }


    /**
     * Register callback on hash options change
     *
     * @param name
     * @param callback
     */
    static onOptionChange(name, callback) {
        if (typeof this.prototype.callbacks === "undefined") {
            this.prototype.callbacks = {};
            window.addEventListener("hashchange", e => {
                this.prototype.__options = ka_parse_query_str(location.hash.slice(1));
                for (let curName in this.prototype.callbacks) {
                    if ( ! this.prototype.callbacks.hasOwnProperty(curName))
                        continue;
                    this.prototype.callbacks[curName](this.options);
                }
            })
        }
        this.prototype.callbacks[name] = callback;
    }

}





/**
 * Select a element
 *
 * @param selector
 * @return {HTMLElement}
 */
function ka(selector) {
    return document.getElementById(selector);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva2FfYnVpbGRfcXVlcnlfc3RyLmpzIiwiY29yZS9rYV9wYXJzZV9xdWVyeV9zdHIuanMiLCJrYS1lbXB0eS5qcyIsImthLWludGVydmFsLmpzIiwia2Etcm91dGUuanMiLCJrYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLXRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCdWlsZCBhIHF1ZXJ5IHN0cmluZyBmcm9tIGFuIG9iamVjdFxuICpcbiAqIDxleGFtcGxlPlxuICogICAgIGthX2J1aWxkX3F1ZXJ5X3N0cih7dmFyMTogXCJ2YWwxXCIsIHZhcjI6IFwidmFsMlwifSk7XG4gKlxuICogICAgIFdpbGwgcmV0dXJuOiBcInZhcjE9dmFsMSZ2YXIyPXZhbDJcIlxuICogPC9leGFtcGxlPlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHJldHVybiBTdHJpbmdcbiAqL1xuZnVuY3Rpb24ga2FfYnVpbGRfcXVlcnlfc3RyKGlucHV0KSB7XG4gICAgbGV0IGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudDtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoaW5wdXQpXG4gICAgICAgIC5tYXAoa2V5ID0+IGVzYyhrZXkpICsgXCI9XCIgKyBlc2MoaW5wdXRba2V5XSkpXG4gICAgICAgIC5qb2luKFwiJlwiKTtcbn0iLCIvKipcbiAqIERlY29kZSBhIHF1ZXJ5IHN0cmluZyAoYWJjPXZhbCZ2YXIyPXZhbDIpIGludG8gYW4gb2JqZWN0XG4gKlxuICogPGV4YW1wbGU+XG4gKiA8L2V4YW1wbGU+XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGthX3BhcnNlX3F1ZXJ5X3N0cihxdWVyeSkge1xuICAgIGxldCB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBmb3IgKGxldCBjb21wIG9mIHZhcnMpIHtcbiAgICAgICAgaWYgKGNvbXAgPT09IFwiXCIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgbGV0IHBhaXIgPSBjb21wLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgcmV0W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59IiwiLyoqXG4gKiBDaGVjayBpZiBwYXJhbWV0ZXIgMSBpcyB1bmRlZmluZWQsIG51bGwsIGVtcHR5IHN0cmluZyBvciBlbXB0eSBhcnJheVxuICpcbiAqIEBwYXJhbSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGthX2VtcHR5ICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiIHx8IChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCk7XG59XG4iLCJcblxuZnVuY3Rpb24ga2FfaW50ZXJ2YWwobmFtZSwgZm4sIGludGVydmFsKSB7XG5cbn1cblxuXG5jbGFzcyBLYUludGVydmFsIHtcblxuICAgIHNldEFjdGl2ZShhY3RpdmUpIHtcblxuICAgIH1cblxuICAgIGlzQWN0aXZlKCkge1xuXG4gICAgfVxufSIsIlxuXG5jbGFzcyBLYVJvdXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9fb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3t9fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgb3B0aW9ucyAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID0ga2FfcGFyc2VfcXVlcnlfc3RyKGxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xuXG4gICAgICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgbGV0IGhhbmRsZXIgPSB7XG4gICAgICAgICAgICBzZXQ6ICh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWJvdW5jZSB1cGRhdGVzIChhbGxvdyBtdWx0aXBsZSB1cGRhdGVzIGJlZm9yZSByb3V0ZSBjaGFuZ2UpXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0ga2FfYnVpbGRfcXVlcnlfc3RyKHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiICYmIHRhcmdldFtrZXldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldFtrZXldLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgb3B0aW9ucyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID0gdmFsdWU7XG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBrYV9idWlsZF9xdWVyeV9zdHIodGhpcy5wcm90b3R5cGUuX19vcHRpb25zKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGNhbGxiYWNrIG9uIGhhc2ggb3B0aW9ucyBjaGFuZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgc3RhdGljIG9uT3B0aW9uQ2hhbmdlKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSBrYV9wYXJzZV9xdWVyeV9zdHIobG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY3VyTmFtZSBpbiB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShjdXJOYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3NbY3VyTmFtZV0odGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIFNlbGVjdCBhIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBrYShzZWxlY3Rvcikge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcik7XG59Il19
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva2FfYnVpbGRfcXVlcnlfc3RyLmpzIiwiY29yZS9rYV9wYXJzZV9xdWVyeV9zdHIuanMiLCJrYS1lbXB0eS5qcyIsImthLWludGVydmFsLmpzIiwia2Etcm91dGUuanMiLCJrYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLXRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCdWlsZCBhIHF1ZXJ5IHN0cmluZyBmcm9tIGFuIG9iamVjdFxuICpcbiAqIDxleGFtcGxlPlxuICogICAgIGthX2J1aWxkX3F1ZXJ5X3N0cih7dmFyMTogXCJ2YWwxXCIsIHZhcjI6IFwidmFsMlwifSk7XG4gKlxuICogICAgIFdpbGwgcmV0dXJuOiBcInZhcjE9dmFsMSZ2YXIyPXZhbDJcIlxuICogPC9leGFtcGxlPlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHJldHVybiBTdHJpbmdcbiAqL1xuZnVuY3Rpb24ga2FfYnVpbGRfcXVlcnlfc3RyKGlucHV0KSB7XG4gICAgbGV0IGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudDtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoaW5wdXQpXG4gICAgICAgIC5tYXAoa2V5ID0+IGVzYyhrZXkpICsgXCI9XCIgKyBlc2MoaW5wdXRba2V5XSkpXG4gICAgICAgIC5qb2luKFwiJlwiKTtcbn0iLCIvKipcbiAqIERlY29kZSBhIHF1ZXJ5IHN0cmluZyAoYWJjPXZhbCZ2YXIyPXZhbDIpIGludG8gYW4gb2JqZWN0XG4gKlxuICogPGV4YW1wbGU+XG4gKiA8L2V4YW1wbGU+XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGthX3BhcnNlX3F1ZXJ5X3N0cihxdWVyeSkge1xuICAgIGxldCB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBmb3IgKGxldCBjb21wIG9mIHZhcnMpIHtcbiAgICAgICAgaWYgKGNvbXAgPT09IFwiXCIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgbGV0IHBhaXIgPSBjb21wLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgcmV0W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59IiwiLyoqXG4gKiBDaGVjayBpZiBwYXJhbWV0ZXIgMSBpcyB1bmRlZmluZWQsIG51bGwsIGVtcHR5IHN0cmluZyBvciBlbXB0eSBhcnJheVxuICpcbiAqIEBwYXJhbSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGthX2VtcHR5ICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiIHx8IChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCk7XG59XG4iLCJcblxuZnVuY3Rpb24ga2FfaW50ZXJ2YWwobmFtZSwgZm4sIGludGVydmFsKSB7XG5cbn1cblxuXG5jbGFzcyBLYUludGVydmFsIHtcblxuICAgIHNldEFjdGl2ZShhY3RpdmUpIHtcblxuICAgIH1cblxuICAgIGlzQWN0aXZlKCkge1xuXG4gICAgfVxufSIsIlxuXG5jbGFzcyBLYVJvdXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9fb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3t9fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgb3B0aW9ucyAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID0ga2FfcGFyc2VfcXVlcnlfc3RyKGxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xuXG4gICAgICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgbGV0IGhhbmRsZXIgPSB7XG4gICAgICAgICAgICBzZXQ6ICh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWJvdW5jZSB1cGRhdGVzIChhbGxvdyBtdWx0aXBsZSB1cGRhdGVzIGJlZm9yZSByb3V0ZSBjaGFuZ2UpXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0ga2FfYnVpbGRfcXVlcnlfc3RyKHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiICYmIHRhcmdldFtrZXldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldFtrZXldLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgb3B0aW9ucyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX19vcHRpb25zID0gdmFsdWU7XG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBrYV9idWlsZF9xdWVyeV9zdHIodGhpcy5wcm90b3R5cGUuX19vcHRpb25zKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGNhbGxiYWNrIG9uIGhhc2ggb3B0aW9ucyBjaGFuZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgc3RhdGljIG9uT3B0aW9uQ2hhbmdlKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSBrYV9wYXJzZV9xdWVyeV9zdHIobG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY3VyTmFtZSBpbiB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShjdXJOYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3NbY3VyTmFtZV0odGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH1cblxufVxuXG5cblxuXG4iLCIvKipcbiAqIFNlbGVjdCBhIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBrYShzZWxlY3Rvcikge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcik7XG59Il19
/**
 * Infracamp's Kasimir Templates
 *
 * A no-dependency render on request
 *
 * @licence
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */

class KtHelper {


    /**
     *
     * @param {string} stmt
     * @param {context} __scope
     * @param {HTMLElement} e
     * @return {any}
     */
    keval(stmt, __scope, e) {
        const reserved = ["var", "null", "let", "const", "function", "class", "in", "of", "for", "true", "false"];
        let r = "";
        for (let __name in __scope) {
            if (reserved.indexOf(__name) !== -1)
                continue;
            r += `var ${__name} = __scope['${__name}'];`
        }
        // If the scope was cloned, the original will be in $scope. This is important when
        // Using events [on.click], e.g.
        if (typeof __scope.$scope === "undefined") {
            r += "var $scope = __scope;";
        }
        try {
            return eval(r + stmt)
        } catch (ex) {
            console.warn("cannot eval() stmt: '" + stmt + "': " + ex + " on element ", e.outerHTML, "(context:", $scope, ")");
            throw "eval('" + stmt + "') failed: " + ex;
        }
    }

    /**
     * Returns a string to be eval()'ed registering
     * all the variables in scope to method context
     *
     * @param {object} $scope
     * @param {string} selector
     * @return {string}
     *
     */
    scopeEval($scope, selector) {
        const reserved = ["var", "null", "let", "const", "function", "class", "in", "of", "for", "true", "false"];
        let r = "";
        for (let __name in $scope) {
            if (reserved.indexOf(__name) !== -1)
                continue;
            r += `var ${__name} = $scope['${__name}'];`
        }
        var __val = null;
        let s = `__val = ${selector};`;
        //console.log(r);
        try {
            eval(r + s);
        } catch (e) {
            console.error(`scopeEval('${r}${s}') failed: ${e}`);
            throw `eval('${s}') failed: ${e}`;
        }
        return __val;
    }

    /**
     *  Find the first whitespaces in text and remove them from the
     *  start of the following lines.
     *
     *  @param {string} str
     *  @return {string}
     */
    unindentText(str) {
        let i = str.match(/\n(\s*)/m)[1];
        str = str.replace(new RegExp(`\n${i}`, "g"), "\n");
        str = str.trim();
        return str;
    }


}

var _KT_ELEMENT_ID = 0;

class KtRenderable extends HTMLTemplateElement {



    constructor() {
        super();
        /**
         *
         * @type {KtHelper}
         * @protected
         */
        this._hlpr = new KtHelper();

        /**
         * Array with all observed elements of this template
         *
         * null indicates, the template was not yet rendered
         *
         * @type {HTMLElement[]}
         * @protected
         */
        this._els = null;
        this._attrs = {"debug": false};

        /**
         * The internal element id to identify which elements
         * to render.
         *
         * @type {number}
         * @protected
         */
        this._ktId = ++_KT_ELEMENT_ID;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this._attrs[attrName] = newVal;
    }

    _log(v1, v2, v3) {
        let a = [ this.constructor.name + "#" + this.id + "[" + this._ktId + "]:"];

        for (let e of arguments)
            a.push(e);

        if (this._attrs.debug !== false)
            console.log.apply(this, a);
    }


    /**
     * Walk through all elements and try to render them.
     *
     * if a element has the _kaMb (maintained by) property set,
     * check if it equals this._kaId (the element id). If not,
     * skip this node.
     *
     *
     * @param {HTMLElement} node
     * @param {object} $scope
     */
    renderRecursive(node, $scope) {
        if (node.hasOwnProperty("_kaMb") && node._kaMb !== this._ktId)
            return;


        if (typeof node.render === "function") {
            node.render($scope);
            return;
        }

        for(let curNode of node.childNodes) {
            if (node.ktSkipRender === true)
                return;
            this.renderRecursive(curNode, $scope);
        }
    }

    _removeNodes() {
        if (this._els === null)
            return;
        for (let el of this._els) {
            if (typeof el._removeNodes === "function")
                el._removeNodes();
            if (this.parentElement !== null)
                this.parentElement.removeChild(el);
        }
        this._els = null;
    }

    /**
     * Clone and append all elements in
     * content of template to the next sibling.
     *
     * @param sibling
     * @protected
     */
    _appendElementsToParent(sibling) {
        if (typeof sibling === "undefined")
            sibling = this.nextSibling;

        let cn = this.content.cloneNode(true);
        this._els = [];
        for (let cel of cn.children) {
            cel._kaMb = this._ktId;
            this._els.push(cel);
        }

        this.parentElement.insertBefore(cn, sibling);

    }

}






class KtTemplateParser {


    /**
     *
     * @param text
     * @param {DocumentFragment} fragment
     * @return {null}
     * @private
     */
    _parseTextNode (text, fragment) {
        let split = text.split(/(\{\{|\}\})/);
        while(split.length > 0) {
            fragment.appendChild(new Text(split.shift()));
            if (split.length === 0)
                break;

            split.shift();
            let val = new KaVal();
            val.setAttribute("stmt", split.shift().trim());
            split.shift();
            fragment.appendChild(val);
        }
    }

    /**
     *
     * @param {HTMLElement} node
     */
    parseRecursive(node) {
        //console.log("[ka-tpl] parseRecursive(", node, ")");
        if (node instanceof DocumentFragment) {
            for (let n of node.children)
                this.parseRecursive(n);
            return;
        }

        if (node.tagName === "SCRIPT")
            return; // Don't parse beween <script></script> tags

        if (typeof node.getAttribute !== "function")
            return;

        if (node.ktParsed === true)
            return;

        node.ktParsed = true;

        for (let textNode of node.childNodes) {
            if (typeof textNode.data === "undefined")
                continue;
            let fragment = new DocumentFragment();
            this._parseTextNode(textNode.data, fragment);
            textNode.replaceWith(fragment);

        }

        if (node.hasAttribute("*for")) {
            let newNode = document.createElement("template", {is: "ka-loop"});
            let attr = node.getAttribute("*for");
            /* @var {HTMLTemplateElement} newNode */
            let cloneNode = node.cloneNode(true);
            newNode.content.appendChild(cloneNode);

            let ma = attr.match(/let\s+(\S*)\s+(in|of|repeat)\s+(\S*)(\s+indexby\s+(\S*))?/);
            if (ma !== null) {
                newNode.setAttribute("formode", ma[2]);
                newNode.setAttribute("forselect", ma[3]);
                newNode.setAttribute("fordata", ma[1]);
                if (typeof ma[5] !== "undefined")
                    newNode.setAttribute("foridx", ma[5]);
                if (node.hasAttribute("*foreval")) {
                    newNode.setAttribute("foreval", node.getAttribute("*foreval"));
                }
            } else {
                throw "Cannot parse *for='" + attr + "' for element " + node.outerHTML;
            }

            node.replaceWith(newNode);
            node = cloneNode;
        }

        if (node.hasAttribute("*if")) {
            let newNode = document.createElement("template", {is: "kt-if"});
            let attr = node.getAttribute("*if");
            /* @var {HTMLTemplateElement} newNode */
            let cloneNode = node.cloneNode(true);
            newNode.content.appendChild(cloneNode);
            newNode.setAttribute("stmt", attr);
            node.replaceWith(newNode);
            node = cloneNode;
        }

        let cssClasses = [];
        let ktClasses = null;
        let attrs = [];
        let events = {};
        let styles = [];

        let regex = new RegExp("^\\[(.+)\\]$");
        for(let attrName of node.getAttributeNames()) {

            let result = regex.exec(attrName);
            if (result === null)
                continue;

            let split = result[1].split(".");
            if (split.length === 1) {
                attrs.push(`'${split[0]}': ` + node.getAttribute(attrName));
            } else {
                switch (split[0]) {
                    case "classlist":
                        if (split[1] === "") {
                            ktClasses = node.getAttribute(attrName);
                            continue;
                        }

                        cssClasses.push(`'${split[1]}': ` + node.getAttribute(attrName));
                        break;

                    case "on":
                        events[split[1]] = node.getAttribute(attrName);
                        break;

                    case "style":
                        styles.push(`'${split[1]}': ` + node.getAttribute(attrName));
                        break;

                    default:
                        console.warn("Invalid attribute '" + attrName + "'")
                }
            }
        }

        if (attrs.length > 0 || cssClasses.length > 0 || ktClasses !== null || Object.keys(events).length > 0 || styles.length > 0) {
            let newNode = document.createElement("template", {is: "kt-maintain"});
            /* @var {HTMLTemplateElement} newNode */
            let cloneNode = node.cloneNode(true);
            newNode.content.appendChild(cloneNode);


            if (attrs.length > 0)
                cloneNode.setAttribute("kt-attrs", "{" + attrs.join(",") + "}");

            if (styles.length > 0)
                cloneNode.setAttribute("kt-styles", "{" + styles.join(",") + "}");

            if (ktClasses !== null) {
                // include [classlist.]="{class: cond}"
                cloneNode.setAttribute("kt-classes", ktClasses);
            } else if (cssClasses.length > 0) {
                cloneNode.setAttribute("kt-classes", "{" + cssClasses.join(",") + "}");
            }

            if (Object.keys(events).length > 0)
                cloneNode.setAttribute("kt-on", JSON.stringify(events));

            node.replaceWith(newNode);
            node = cloneNode;
        }

        for (let curNode of node.children)
            this.parseRecursive(curNode);



    }

}
/**
 *
 * @return KaTpl
 */
function ka_tpl(selector) {
    if (selector instanceof KaTpl)
        return selector;
    let elem = document.getElementById(selector);
    if (elem instanceof KaTpl) {
        return elem;
    }
    throw `Selector '${selector}' is not a <template is="ka-tpl"> element`;
}



var KT_FN = {
    /**
     *
     * @param {HTMLElement} elem
     * @param {string} val
     * @param scope
     */
    "kt-classes": function(elem, val, scope) {
        "use strict";

        let kthelper = new KtHelper();
        let classes = kthelper.scopeEval(scope, val);
        for (let className in classes) {
            if ( ! classes.hasOwnProperty(className))
                continue;
            if (classes[className] === true) {
                elem.classList.add(className);
            } else {
                elem.classList.remove(className);
            }
        }
    },

    /**
     *
     * @param {HTMLElement} elem
     * @param {string} val
     * @param scope
     */
    "kt-styles": function(elem, val, scope) {
        "use strict";

        let kthelper = new KtHelper();
        let styles = kthelper.scopeEval(scope, val);
        for (let styleName in styles) {
            if ( ! styles.hasOwnProperty(styleName))
                continue;
            if (styles[styleName] === null) {
                elem.style.removeProperty(styleName);
            } else {
                elem.style.setProperty(styleName, styles[styleName]);
            }
        }
    },

    "kt-attrs": function (elem, val, scope) {
        let kthelper = new KtHelper();
        let classes = kthelper.scopeEval(scope, val);
        for (let className in classes) {
            if ( ! classes.hasOwnProperty(className))
                continue;
            if (classes[className] !== null && classes[className] !== false) {
                elem.setAttribute(className, classes[className]);
            } else {
                elem.removeAttribute(className);
            }
        }
    },
    "kt-on": function (elem, val, $scope) {
        let kthelper = new KtHelper();

        // Clone the first layer of the scope so it can be evaluated on event
        let saveScope = {...$scope};
        saveScope.$scope = $scope;

        let events = JSON.parse(val);
        for (let event in events) {
            elem["on" + event] = (e) => {
                kthelper.keval(events[event], saveScope, elem);
                return false;
            }
        }

    }
};


class KaInclude extends KtRenderable {


    constructor() {
        super();
        this._attrs = {
            "src": null,
            "auto": null,
            "raw": null,
            "debug": false
        }
    }

    static get observedAttributes() {
        return ["src", "debug", "auto", "raw"];
    }


    /**
     * <script> tags that were loaded via ajax won't be executed
     * when added to dom.
     *
     * Therefore we have to rewrite them. This method does this
     * automatically both for normal and for template (content) nodes.
     *
     * @param node
     * @private
     */
    _importScritpRecursive(node) {
        let chels = node instanceof HTMLTemplateElement ? node.content.childNodes : node.childNodes;

        for (let s of chels) {
            if (s.tagName !== "SCRIPT") {
                this._importScritpRecursive(s);
                continue;
            }
            let n = document.createElement("script");
            n.innerHTML = s.innerHTML;
            s.replaceWith(n);
        }
    }


    _loadDataRemote() {
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", this._attrs.src);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 400) {
                    console.warn("Can't load '" + this.params.src + "': " + xhttp.responseText);
                    return;
                }
                this.innerHTML = xhttp.responseText;
                if (this._attrs.raw !== null) {
                    let p = new KtTemplateParser();
                    p.parseRecursive(this.content);
                }

                // Nodes loaded from remote won't get executed. So import them.
                this._importScritpRecursive(this.content);

                this._appendElementsToParent();
                for (let el of this._els) {
                    this._log("trigger DOMContentLoaded event on", el);
                    el.dispatchEvent(new Event("DOMContentLoaded"));
                }
                return;
            }

        };

        xhttp.send();
    }

    disconnectedCallback() {
        for (let el of this._els)
            this.parentElement.removeChild(el);
    }

    connectedCallback() {
        let auto = this.getAttribute("auto");
        if (auto !== null) {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => {
                    this._loadDataRemote();
                });
            } else {
                this._loadDataRemote();
            }
        }
    }

    render(context) {
        if (this._els === null)
            this._appendElementsToParent();


    }
}

customElements.define("ka-include", KaInclude, {extends: "template"});



class KaLoop extends KtRenderable {


    constructor() {
        super();
        this._origSibling = false;
        this._attrs = {
            "forselect": null,
            "formode": null,
            "foridx": null,
            "fordata": null,
            "foreval": null
        }
        this._els = [];
    }

    static get observedAttributes() {
        return ["forselect", "foridx", "fordata", "foreval", "formode"];
    }


    _appendElem() {
        let newNode = this.content.cloneNode(true);
        let nodes = [];
        for (let curNode of newNode.children) {
            curNode._kaMb = this._ktId;
            nodes.push(curNode);
        }
        for (let i = 0; i < nodes.length; i++)
            this.parentElement.insertBefore(nodes[i], this._origSibling);
        this._els.push({
            node: nodes
        });
    }


    _maintainNode(i, $scope) {
        if (this._els.length < i+1)
            this._appendElem();
        if (this._attrs.foridx !== null)
            $scope[this._attrs.foridx] = i;

        if (this._attrs.foreval !== null)
            this._hlpr.keval(this._attrs.foreval, $scope, this);

        for (let curNode of this._els[i].node) {
            this.renderRecursive(curNode, $scope);
        }
    }


    render($scope) {
        let _a_sel = this._attrs.forselect;
        let sel = this._hlpr.scopeEval($scope, _a_sel);

        if (typeof sel !== "object") {
            console.warn(`Invalid forSelect="${_a_sel}" returned:`, select, "on context", context, "(Element: ", this.outerHTML, ")");
            throw "Invalid forSelect selector. see waring."
        }

        if (sel === null || typeof sel[Symbol.iterator] !== "function") {
            this._log(`Selector '${_a_sel}' in for statement is not iterable. Returned value: `, sel, "in", this.outerHTML);
            console.warn(`Selector '${_a_sel}' in for statement is not iterable. Returned value: `, sel, "in", this.outerHTML)
            return;
        }

        if (this._origSibling === false)
            this._origSibling = this.nextSibling;


        let n = 0;
        switch (this._attrs.formode) {
            case "in":
                for(n in sel) {
                    $scope[this._attrs.fordata] = n;
                    this._maintainNode(n, $scope);
                }
                break;

            case "of":
                n = 0;
                for (let i of sel) {

                    $scope[this._attrs.fordata] = i;
                    this._maintainNode(n, $scope);
                    n++;
                }
                break;

            case "repeat":
                for (n=0; n < sel; n++) {
                    $scope[this._attrs.fordata] = n;
                    this._maintainNode(n, $scope);
                    n++;
                }
                break;
            default:
                throw "Invalid for type '" + this._attrs.formode + "' in " . this.outerHTML;
        }


        for (let idx = n; sel.length < this._els.length; idx++) {
            let elem = this._els.pop();
            for (let curNode of elem.node) {
                if (typeof curNode._removeNodes === "function")
                    curNode._removeNodes();
                this.parentElement.removeChild(curNode);
            }
        }
    }
}

customElements.define("ka-loop", KaLoop, {extends: "template"});
var KASELF = null;

class KaTpl extends KtRenderable {


    constructor() {
        super();
        this._attrs = {
            "debug": false,
            "stmt": null,
            "afterrender": null
        };

        // Switched to to during _init() to allow <script> to set scope without rendering.
        this._isInitializing = false;
        this._isRendering = false;
        this._scope = {};
    }

    static get observedAttributes() {
        return ["stmt", "debug"];
    }


    disconnectedCallback() {
        for (let el of this._els)
            this.parentElement.removeChild(el);
    }

    connectedCallback() {
        this._log("connectedCallback()", this);
        let auto = this.getAttribute("auto")
        if (auto !== null) {
            this._log("autostart: _init()", "document.readyState: ", document.readyState);

            let init = () => {
                this._init();
                if (auto === "")
                    this.render(this.$scope);
                else
                    eval(auto);
            };

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => {
                    init();
                })
            } else {
                init();
            }
        }
    }

    /**
     * Set the scope and render the template
     *
     * ```
     * ka_tpl("tpl01").$scope = {name: "bob"};
     * ```
     *
     * @param val
     */
    set $scope(val) {
        this._scope = val;

        // Render only if dom available (allow <script> inside template to set scope before first rendering
        if ( ! this._isInitializing)
            this.render(this._scope);
    }

    get $scope() {
        let handler = {
            set: (target, property, value, receiver) => {
                //console.log ("set:", target, property, value);
                target[property] = value;
                // Don't update proxy during rendering (recursion)
                if ( ! this._isRendering)
                    this.render(this.$scope);
                return true;
            },
            get: (target, key) => {
                if (typeof target[key] === "object" && target[key] !== null)
                    return new Proxy(target[key], handler);
                return target[key];
            }

        };
        return new Proxy(this._scope, handler);
    }



    _init() {
        if (this._els !== null)
            return;
        this._isInitializing = true;
        if (this.nextElementSibling !== null) {
            // Remove loader element
            if (this.nextElementSibling.hasAttribute("ka-loader"))
                this.parentElement.removeChild(this.nextElementSibling);
        }
        let sibling = this.nextSibling;
        (new KtTemplateParser).parseRecursive(this.content);

        KASELF = this;
        if (this._els === null)
            this._appendElementsToParent();

        this._isInitializing = false;
    }

    render($scope) {
        if (typeof $scope === "undefined")
            $scope = this.$scope;
        this._log("render($scope= ", $scope, ")");
        this._init();
        this._isRendering = true;
        for(let ce of this._els) {
            this.renderRecursive(ce, $scope);
        }
        this._isRendering = false;
    }
}

customElements.define("ka-tpl", KaTpl, {extends: "template"});
class KaVal extends HTMLElement {


    constructor() {
        super();
        /**
         *
         * @type {KtHelper}
         * @private
         */
        this._ktHlpr = new KtHelper();
        this._attrs = {
            "debug": false,
            "stmt": null,
            "afterrender": null
        }
    }

    static get observedAttributes() {
        return ["stmt", "afterrender", "debug"];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this._attrs[attrName] = newVal;
    }

    connectedCallback() {
        if (this.hasAttribute("auto"))
            this.render({});
    }
    _log() {
        if (this._attrs.debug !== false) {

            console.log.apply(this, arguments);
        }

    }
    render($scope) {
        this._log(`render(`, $scope, `) on '${this.outerHTML}'`);
        try {

            let v = this._ktHlpr.scopeEval($scope, this._attrs.stmt);
            if (typeof v === "object")
                v = JSON.stringify(v);

            if (this.hasAttribute("unindent")) {
                v = this._ktHlpr.unindentText(v);
            }

            if (this.hasAttribute("html")) {
                this.innerHTML = v;
            } else {
                this.innerText = v;
            }
            if (this._attrs.afterrender !== null)
                eval(this._attrs.afterrender)
        } catch (e) {
            this.innerText = e;
        }
    }
}

customElements.define("ka-val", KaVal);



class KtIf extends KtRenderable {
    constructor() {
        super();
        this._attrs = {
            "stmt": null
        }
    }

    static get observedAttributes() {
        return ["stmt"];
    }

    render($scope) {
        let isTrue = this._hlpr.scopeEval($scope, this._attrs.stmt);

        if ( ! isTrue) {
            this._removeNodes();
            return;
        }
        if (this._els === null) {
            this._appendElementsToParent();
        }

        for (let curNode of this._els)
            this.renderRecursive(curNode, $scope);
    }
}

customElements.define("kt-if", KtIf, {extends: "template"});



class KtMaintain extends KtRenderable {


    constructor() {
        super();
        this._attrs = {
            "stmt": null,
            "debug": false
        }
    }

    static get observedAttributes() {
        return ["stmt", "debug"];
    }


    disconnectedCallback() {
        this._removeNodes();
    }

    render($scope) {
        if (this._els === null) {
            this._appendElementsToParent()
        }

        for (let curElement of this._els) {
            if ( typeof curElement.hasAttribute !== "function")
                continue;
            for (let attrName in KT_FN) {
                if ( ! curElement.hasAttribute(attrName))
                    continue;
                KT_FN[attrName](curElement, curElement.getAttribute(attrName), $scope);
            }
            this.renderRecursive(curElement, $scope, true);
        }
    }
}

customElements.define("kt-maintain", KtMaintain, {extends: "template"});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva3QtaGVscGVyLmpzIiwiY29yZS9rdC1yZW5kZXJhYmxlLmpzIiwiY29yZS9LdFRlbXBsYXRlUGFyc2VyLmpzIiwiZnVuY3Rpb25zLmpzIiwia2EtaW5jbHVkZS5qcyIsImthLWxvb3AuanMiLCJrYS10cGwuanMiLCJrYS12YWwuanMiLCJrdC1pZi5qcyIsImt0LW1haW50YWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imthc2ltaXItdHBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jbGFzcyBLdEhlbHBlciB7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0bXRcbiAgICAgKiBAcGFyYW0ge2NvbnRleHR9IF9fc2NvcGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGtldmFsKHN0bXQsIF9fc2NvcGUsIGUpIHtcbiAgICAgICAgY29uc3QgcmVzZXJ2ZWQgPSBbXCJ2YXJcIiwgXCJudWxsXCIsIFwibGV0XCIsIFwiY29uc3RcIiwgXCJmdW5jdGlvblwiLCBcImNsYXNzXCIsIFwiaW5cIiwgXCJvZlwiLCBcImZvclwiLCBcInRydWVcIiwgXCJmYWxzZVwiXTtcbiAgICAgICAgbGV0IHIgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBfX25hbWUgaW4gX19zY29wZSkge1xuICAgICAgICAgICAgaWYgKHJlc2VydmVkLmluZGV4T2YoX19uYW1lKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICByICs9IGB2YXIgJHtfX25hbWV9ID0gX19zY29wZVsnJHtfX25hbWV9J107YFxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBzY29wZSB3YXMgY2xvbmVkLCB0aGUgb3JpZ2luYWwgd2lsbCBiZSBpbiAkc2NvcGUuIFRoaXMgaXMgaW1wb3J0YW50IHdoZW5cbiAgICAgICAgLy8gVXNpbmcgZXZlbnRzIFtvbi5jbGlja10sIGUuZy5cbiAgICAgICAgaWYgKHR5cGVvZiBfX3Njb3BlLiRzY29wZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgciArPSBcInZhciAkc2NvcGUgPSBfX3Njb3BlO1wiO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZXZhbChyICsgc3RtdClcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNhbm5vdCBldmFsKCkgc3RtdDogJ1wiICsgc3RtdCArIFwiJzogXCIgKyBleCArIFwiIG9uIGVsZW1lbnQgXCIsIGUub3V0ZXJIVE1MLCBcIihjb250ZXh0OlwiLCAkc2NvcGUsIFwiKVwiKTtcbiAgICAgICAgICAgIHRocm93IFwiZXZhbCgnXCIgKyBzdG10ICsgXCInKSBmYWlsZWQ6IFwiICsgZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRvIGJlIGV2YWwoKSdlZCByZWdpc3RlcmluZ1xuICAgICAqIGFsbCB0aGUgdmFyaWFibGVzIGluIHNjb3BlIHRvIG1ldGhvZCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJHNjb3BlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqXG4gICAgICovXG4gICAgc2NvcGVFdmFsKCRzY29wZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgcmVzZXJ2ZWQgPSBbXCJ2YXJcIiwgXCJudWxsXCIsIFwibGV0XCIsIFwiY29uc3RcIiwgXCJmdW5jdGlvblwiLCBcImNsYXNzXCIsIFwiaW5cIiwgXCJvZlwiLCBcImZvclwiLCBcInRydWVcIiwgXCJmYWxzZVwiXTtcbiAgICAgICAgbGV0IHIgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBfX25hbWUgaW4gJHNjb3BlKSB7XG4gICAgICAgICAgICBpZiAocmVzZXJ2ZWQuaW5kZXhPZihfX25hbWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHIgKz0gYHZhciAke19fbmFtZX0gPSAkc2NvcGVbJyR7X19uYW1lfSddO2BcbiAgICAgICAgfVxuICAgICAgICB2YXIgX192YWwgPSBudWxsO1xuICAgICAgICBsZXQgcyA9IGBfX3ZhbCA9ICR7c2VsZWN0b3J9O2A7XG4gICAgICAgIC8vY29uc29sZS5sb2cocik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBldmFsKHIgKyBzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgc2NvcGVFdmFsKCcke3J9JHtzfScpIGZhaWxlZDogJHtlfWApO1xuICAgICAgICAgICAgdGhyb3cgYGV2YWwoJyR7c30nKSBmYWlsZWQ6ICR7ZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX3ZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgRmluZCB0aGUgZmlyc3Qgd2hpdGVzcGFjZXMgaW4gdGV4dCBhbmQgcmVtb3ZlIHRoZW0gZnJvbSB0aGVcbiAgICAgKiAgc3RhcnQgb2YgdGhlIGZvbGxvd2luZyBsaW5lcy5cbiAgICAgKlxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gc3RyXG4gICAgICogIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB1bmluZGVudFRleHQoc3RyKSB7XG4gICAgICAgIGxldCBpID0gc3RyLm1hdGNoKC9cXG4oXFxzKikvbSlbMV07XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcbiR7aX1gLCBcImdcIiksIFwiXFxuXCIpO1xuICAgICAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuXG59IiwiXG52YXIgX0tUX0VMRU1FTlRfSUQgPSAwO1xuXG5jbGFzcyBLdFJlbmRlcmFibGUgZXh0ZW5kcyBIVE1MVGVtcGxhdGVFbGVtZW50IHtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtLdEhlbHBlcn1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faGxwciA9IG5ldyBLdEhlbHBlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcnJheSB3aXRoIGFsbCBvYnNlcnZlZCBlbGVtZW50cyBvZiB0aGlzIHRlbXBsYXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIG51bGwgaW5kaWNhdGVzLCB0aGUgdGVtcGxhdGUgd2FzIG5vdCB5ZXQgcmVuZGVyZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2VscyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2F0dHJzID0ge1wiZGVidWdcIjogZmFsc2V9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW50ZXJuYWwgZWxlbWVudCBpZCB0byBpZGVudGlmeSB3aGljaCBlbGVtZW50c1xuICAgICAgICAgKiB0byByZW5kZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2t0SWQgPSArK19LVF9FTEVNRU5UX0lEO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyTmFtZSwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fYXR0cnNbYXR0ck5hbWVdID0gbmV3VmFsO1xuICAgIH1cblxuICAgIF9sb2codjEsIHYyLCB2Mykge1xuICAgICAgICBsZXQgYSA9IFsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjXCIgKyB0aGlzLmlkICsgXCJbXCIgKyB0aGlzLl9rdElkICsgXCJdOlwiXTtcblxuICAgICAgICBmb3IgKGxldCBlIG9mIGFyZ3VtZW50cylcbiAgICAgICAgICAgIGEucHVzaChlKTtcblxuICAgICAgICBpZiAodGhpcy5fYXR0cnMuZGVidWcgIT09IGZhbHNlKVxuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkodGhpcywgYSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXYWxrIHRocm91Z2ggYWxsIGVsZW1lbnRzIGFuZCB0cnkgdG8gcmVuZGVyIHRoZW0uXG4gICAgICpcbiAgICAgKiBpZiBhIGVsZW1lbnQgaGFzIHRoZSBfa2FNYiAobWFpbnRhaW5lZCBieSkgcHJvcGVydHkgc2V0LFxuICAgICAqIGNoZWNrIGlmIGl0IGVxdWFscyB0aGlzLl9rYUlkICh0aGUgZWxlbWVudCBpZCkuIElmIG5vdCxcbiAgICAgKiBza2lwIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkc2NvcGVcbiAgICAgKi9cbiAgICByZW5kZXJSZWN1cnNpdmUobm9kZSwgJHNjb3BlKSB7XG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KFwiX2thTWJcIikgJiYgbm9kZS5fa2FNYiAhPT0gdGhpcy5fa3RJZClcbiAgICAgICAgICAgIHJldHVybjtcblxuXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbm9kZS5yZW5kZXIoJHNjb3BlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgY3VyTm9kZSBvZiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmt0U2tpcFJlbmRlciA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlY3Vyc2l2ZShjdXJOb2RlLCAkc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3JlbW92ZU5vZGVzKCkge1xuICAgICAgICBpZiAodGhpcy5fZWxzID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWwuX3JlbW92ZU5vZGVzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgZWwuX3JlbW92ZU5vZGVzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRFbGVtZW50ICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZSBhbmQgYXBwZW5kIGFsbCBlbGVtZW50cyBpblxuICAgICAqIGNvbnRlbnQgb2YgdGVtcGxhdGUgdG8gdGhlIG5leHQgc2libGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaWJsaW5nXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9hcHBlbmRFbGVtZW50c1RvUGFyZW50KHNpYmxpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzaWJsaW5nID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgc2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgbGV0IGNuID0gdGhpcy5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGhpcy5fZWxzID0gW107XG4gICAgICAgIGZvciAobGV0IGNlbCBvZiBjbi5jaGlsZHJlbikge1xuICAgICAgICAgICAgY2VsLl9rYU1iID0gdGhpcy5fa3RJZDtcbiAgICAgICAgICAgIHRoaXMuX2Vscy5wdXNoKGNlbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNuLCBzaWJsaW5nKTtcblxuICAgIH1cblxufVxuXG5cblxuIiwiXG5cbmNsYXNzIEt0VGVtcGxhdGVQYXJzZXIge1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudFxuICAgICAqIEByZXR1cm4ge251bGx9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcGFyc2VUZXh0Tm9kZSAodGV4dCwgZnJhZ21lbnQpIHtcbiAgICAgICAgbGV0IHNwbGl0ID0gdGV4dC5zcGxpdCgvKFxce1xce3xcXH1cXH0pLyk7XG4gICAgICAgIHdoaWxlKHNwbGl0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ldyBUZXh0KHNwbGl0LnNoaWZ0KCkpKTtcbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIHNwbGl0LnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgdmFsID0gbmV3IEthVmFsKCk7XG4gICAgICAgICAgICB2YWwuc2V0QXR0cmlidXRlKFwic3RtdFwiLCBzcGxpdC5zaGlmdCgpLnRyaW0oKSk7XG4gICAgICAgICAgICBzcGxpdC5zaGlmdCgpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqL1xuICAgIHBhcnNlUmVjdXJzaXZlKG5vZGUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIltrYS10cGxdIHBhcnNlUmVjdXJzaXZlKFwiLCBub2RlLCBcIilcIik7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgICAgZm9yIChsZXQgbiBvZiBub2RlLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VSZWN1cnNpdmUobik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSBcIlNDUklQVFwiKVxuICAgICAgICAgICAgcmV0dXJuOyAvLyBEb24ndCBwYXJzZSBiZXdlZW4gPHNjcmlwdD48L3NjcmlwdD4gdGFnc1xuXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5nZXRBdHRyaWJ1dGUgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAobm9kZS5rdFBhcnNlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBub2RlLmt0UGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGxldCB0ZXh0Tm9kZSBvZiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dE5vZGUuZGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBmcmFnbWVudCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVRleHROb2RlKHRleHROb2RlLmRhdGEsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIHRleHROb2RlLnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKFwiKmZvclwiKSkge1xuICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwge2lzOiBcImthLWxvb3BcIn0pO1xuICAgICAgICAgICAgbGV0IGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShcIipmb3JcIik7XG4gICAgICAgICAgICAvKiBAdmFyIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBuZXdOb2RlICovXG4gICAgICAgICAgICBsZXQgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBuZXdOb2RlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKTtcblxuICAgICAgICAgICAgbGV0IG1hID0gYXR0ci5tYXRjaCgvbGV0XFxzKyhcXFMqKVxccysoaW58b2Z8cmVwZWF0KVxccysoXFxTKikoXFxzK2luZGV4YnlcXHMrKFxcUyopKT8vKTtcbiAgICAgICAgICAgIGlmIChtYSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9ybW9kZVwiLCBtYVsyXSk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoXCJmb3JzZWxlY3RcIiwgbWFbM10pO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9yZGF0YVwiLCBtYVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYVs1XSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoXCJmb3JpZHhcIiwgbWFbNV0pO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShcIipmb3JldmFsXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9yZXZhbFwiLCBub2RlLmdldEF0dHJpYnV0ZShcIipmb3JldmFsXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IHBhcnNlICpmb3I9J1wiICsgYXR0ciArIFwiJyBmb3IgZWxlbWVudCBcIiArIG5vZGUub3V0ZXJIVE1MO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IGNsb25lTm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShcIippZlwiKSkge1xuICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwge2lzOiBcImt0LWlmXCJ9KTtcbiAgICAgICAgICAgIGxldCBhdHRyID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCIqaWZcIik7XG4gICAgICAgICAgICAvKiBAdmFyIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBuZXdOb2RlICovXG4gICAgICAgICAgICBsZXQgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBuZXdOb2RlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwic3RtdFwiLCBhdHRyKTtcbiAgICAgICAgICAgIG5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZSk7XG4gICAgICAgICAgICBub2RlID0gY2xvbmVOb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNzc0NsYXNzZXMgPSBbXTtcbiAgICAgICAgbGV0IGt0Q2xhc3NlcyA9IG51bGw7XG4gICAgICAgIGxldCBhdHRycyA9IFtdO1xuICAgICAgICBsZXQgZXZlbnRzID0ge307XG4gICAgICAgIGxldCBzdHlsZXMgPSBbXTtcblxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlxcXFxbKC4rKVxcXFxdJFwiKTtcbiAgICAgICAgZm9yKGxldCBhdHRyTmFtZSBvZiBub2RlLmdldEF0dHJpYnV0ZU5hbWVzKCkpIHtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlZ2V4LmV4ZWMoYXR0ck5hbWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgbGV0IHNwbGl0ID0gcmVzdWx0WzFdLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhdHRycy5wdXNoKGAnJHtzcGxpdFswXX0nOiBgICsgbm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzcGxpdFswXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NsaXN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRbMV0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdENsYXNzZXMgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaChgJyR7c3BsaXRbMV19JzogYCArIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwib25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1tzcGxpdFsxXV0gPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKGAnJHtzcGxpdFsxXX0nOiBgICsgbm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIGF0dHJpYnV0ZSAnXCIgKyBhdHRyTmFtZSArIFwiJ1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdHRycy5sZW5ndGggPiAwIHx8IGNzc0NsYXNzZXMubGVuZ3RoID4gMCB8fCBrdENsYXNzZXMgIT09IG51bGwgfHwgT2JqZWN0LmtleXMoZXZlbnRzKS5sZW5ndGggPiAwIHx8IHN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiLCB7aXM6IFwia3QtbWFpbnRhaW5cIn0pO1xuICAgICAgICAgICAgLyogQHZhciB7SFRNTFRlbXBsYXRlRWxlbWVudH0gbmV3Tm9kZSAqL1xuICAgICAgICAgICAgbGV0IGNsb25lTm9kZSA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgbmV3Tm9kZS5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lTm9kZSk7XG5cblxuICAgICAgICAgICAgaWYgKGF0dHJzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgY2xvbmVOb2RlLnNldEF0dHJpYnV0ZShcImt0LWF0dHJzXCIsIFwie1wiICsgYXR0cnMuam9pbihcIixcIikgKyBcIn1cIik7XG5cbiAgICAgICAgICAgIGlmIChzdHlsZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3Qtc3R5bGVzXCIsIFwie1wiICsgc3R5bGVzLmpvaW4oXCIsXCIpICsgXCJ9XCIpO1xuXG4gICAgICAgICAgICBpZiAoa3RDbGFzc2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBbY2xhc3NsaXN0Ll09XCJ7Y2xhc3M6IGNvbmR9XCJcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3QtY2xhc3Nlc1wiLCBrdENsYXNzZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjc3NDbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3QtY2xhc3Nlc1wiLCBcIntcIiArIGNzc0NsYXNzZXMuam9pbihcIixcIikgKyBcIn1cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudHMpLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgY2xvbmVOb2RlLnNldEF0dHJpYnV0ZShcImt0LW9uXCIsIEpTT04uc3RyaW5naWZ5KGV2ZW50cykpO1xuXG4gICAgICAgICAgICBub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IGNsb25lTm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGN1ck5vZGUgb2Ygbm9kZS5jaGlsZHJlbilcbiAgICAgICAgICAgIHRoaXMucGFyc2VSZWN1cnNpdmUoY3VyTm9kZSk7XG5cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKlxuICogQHJldHVybiBLYVRwbFxuICovXG5mdW5jdGlvbiBrYV90cGwoc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBLYVRwbClcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtIGluc3RhbmNlb2YgS2FUcGwpIHtcbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIHRocm93IGBTZWxlY3RvciAnJHtzZWxlY3Rvcn0nIGlzIG5vdCBhIDx0ZW1wbGF0ZSBpcz1cImthLXRwbFwiPiBlbGVtZW50YDtcbn1cblxuXG5cbnZhciBLVF9GTiA9IHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsXG4gICAgICogQHBhcmFtIHNjb3BlXG4gICAgICovXG4gICAgXCJrdC1jbGFzc2VzXCI6IGZ1bmN0aW9uKGVsZW0sIHZhbCwgc2NvcGUpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgICAgbGV0IGt0aGVscGVyID0gbmV3IEt0SGVscGVyKCk7XG4gICAgICAgIGxldCBjbGFzc2VzID0ga3RoZWxwZXIuc2NvcGVFdmFsKHNjb3BlLCB2YWwpO1xuICAgICAgICBmb3IgKGxldCBjbGFzc05hbWUgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKCAhIGNsYXNzZXMuaGFzT3duUHJvcGVydHkoY2xhc3NOYW1lKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChjbGFzc2VzW2NsYXNzTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICAgICAqIEBwYXJhbSBzY29wZVxuICAgICAqL1xuICAgIFwia3Qtc3R5bGVzXCI6IGZ1bmN0aW9uKGVsZW0sIHZhbCwgc2NvcGUpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgICAgbGV0IGt0aGVscGVyID0gbmV3IEt0SGVscGVyKCk7XG4gICAgICAgIGxldCBzdHlsZXMgPSBrdGhlbHBlci5zY29wZUV2YWwoc2NvcGUsIHZhbCk7XG4gICAgICAgIGZvciAobGV0IHN0eWxlTmFtZSBpbiBzdHlsZXMpIHtcbiAgICAgICAgICAgIGlmICggISBzdHlsZXMuaGFzT3duUHJvcGVydHkoc3R5bGVOYW1lKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChzdHlsZXNbc3R5bGVOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGVOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZU5hbWUsIHN0eWxlc1tzdHlsZU5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcImt0LWF0dHJzXCI6IGZ1bmN0aW9uIChlbGVtLCB2YWwsIHNjb3BlKSB7XG4gICAgICAgIGxldCBrdGhlbHBlciA9IG5ldyBLdEhlbHBlcigpO1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGt0aGVscGVyLnNjb3BlRXZhbChzY29wZSwgdmFsKTtcbiAgICAgICAgZm9yIChsZXQgY2xhc3NOYW1lIGluIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmICggISBjbGFzc2VzLmhhc093blByb3BlcnR5KGNsYXNzTmFtZSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoY2xhc3Nlc1tjbGFzc05hbWVdICE9PSBudWxsICYmIGNsYXNzZXNbY2xhc3NOYW1lXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShjbGFzc05hbWUsIGNsYXNzZXNbY2xhc3NOYW1lXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwia3Qtb25cIjogZnVuY3Rpb24gKGVsZW0sIHZhbCwgJHNjb3BlKSB7XG4gICAgICAgIGxldCBrdGhlbHBlciA9IG5ldyBLdEhlbHBlcigpO1xuXG4gICAgICAgIC8vIENsb25lIHRoZSBmaXJzdCBsYXllciBvZiB0aGUgc2NvcGUgc28gaXQgY2FuIGJlIGV2YWx1YXRlZCBvbiBldmVudFxuICAgICAgICBsZXQgc2F2ZVNjb3BlID0gey4uLiRzY29wZX07XG4gICAgICAgIHNhdmVTY29wZS4kc2NvcGUgPSAkc2NvcGU7XG5cbiAgICAgICAgbGV0IGV2ZW50cyA9IEpTT04ucGFyc2UodmFsKTtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICBlbGVtW1wib25cIiArIGV2ZW50XSA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAga3RoZWxwZXIua2V2YWwoZXZlbnRzW2V2ZW50XSwgc2F2ZVNjb3BlLCBlbGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn07IiwiXG5cbmNsYXNzIEthSW5jbHVkZSBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwic3JjXCI6IG51bGwsXG4gICAgICAgICAgICBcImF1dG9cIjogbnVsbCxcbiAgICAgICAgICAgIFwicmF3XCI6IG51bGwsXG4gICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcInNyY1wiLCBcImRlYnVnXCIsIFwiYXV0b1wiLCBcInJhd1wiXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIDxzY3JpcHQ+IHRhZ3MgdGhhdCB3ZXJlIGxvYWRlZCB2aWEgYWpheCB3b24ndCBiZSBleGVjdXRlZFxuICAgICAqIHdoZW4gYWRkZWQgdG8gZG9tLlxuICAgICAqXG4gICAgICogVGhlcmVmb3JlIHdlIGhhdmUgdG8gcmV3cml0ZSB0aGVtLiBUaGlzIG1ldGhvZCBkb2VzIHRoaXNcbiAgICAgKiBhdXRvbWF0aWNhbGx5IGJvdGggZm9yIG5vcm1hbCBhbmQgZm9yIHRlbXBsYXRlIChjb250ZW50KSBub2Rlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW1wb3J0U2NyaXRwUmVjdXJzaXZlKG5vZGUpIHtcbiAgICAgICAgbGV0IGNoZWxzID0gbm9kZSBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPyBub2RlLmNvbnRlbnQuY2hpbGROb2RlcyA6IG5vZGUuY2hpbGROb2RlcztcblxuICAgICAgICBmb3IgKGxldCBzIG9mIGNoZWxzKSB7XG4gICAgICAgICAgICBpZiAocy50YWdOYW1lICE9PSBcIlNDUklQVFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wb3J0U2NyaXRwUmVjdXJzaXZlKHMpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgbi5pbm5lckhUTUwgPSBzLmlubmVySFRNTDtcbiAgICAgICAgICAgIHMucmVwbGFjZVdpdGgobik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9sb2FkRGF0YVJlbW90ZSgpIHtcbiAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCB0aGlzLl9hdHRycy5zcmMpO1xuICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHR0cC5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbid0IGxvYWQgJ1wiICsgdGhpcy5wYXJhbXMuc3JjICsgXCInOiBcIiArIHhodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgPSB4aHR0cC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F0dHJzLnJhdyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBLdFRlbXBsYXRlUGFyc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIHAucGFyc2VSZWN1cnNpdmUodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBOb2RlcyBsb2FkZWQgZnJvbSByZW1vdGUgd29uJ3QgZ2V0IGV4ZWN1dGVkLiBTbyBpbXBvcnQgdGhlbS5cbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBvcnRTY3JpdHBSZWN1cnNpdmUodGhpcy5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nKFwidHJpZ2dlciBET01Db250ZW50TG9hZGVkIGV2ZW50IG9uXCIsIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJET01Db250ZW50TG9hZGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBsZXQgYXV0byA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXV0b1wiKTtcbiAgICAgICAgaWYgKGF1dG8gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZERhdGFSZW1vdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZERhdGFSZW1vdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLl9lbHMgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtZW50c1RvUGFyZW50KCk7XG5cblxuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtaW5jbHVkZVwiLCBLYUluY2x1ZGUsIHtleHRlbmRzOiBcInRlbXBsYXRlXCJ9KTsiLCJcblxuXG5jbGFzcyBLYUxvb3AgZXh0ZW5kcyBLdFJlbmRlcmFibGUge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb3JpZ1NpYmxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcImZvcnNlbGVjdFwiOiBudWxsLFxuICAgICAgICAgICAgXCJmb3Jtb2RlXCI6IG51bGwsXG4gICAgICAgICAgICBcImZvcmlkeFwiOiBudWxsLFxuICAgICAgICAgICAgXCJmb3JkYXRhXCI6IG51bGwsXG4gICAgICAgICAgICBcImZvcmV2YWxcIjogbnVsbFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VscyA9IFtdO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gW1wiZm9yc2VsZWN0XCIsIFwiZm9yaWR4XCIsIFwiZm9yZGF0YVwiLCBcImZvcmV2YWxcIiwgXCJmb3Jtb2RlXCJdO1xuICAgIH1cblxuXG4gICAgX2FwcGVuZEVsZW0oKSB7XG4gICAgICAgIGxldCBuZXdOb2RlID0gdGhpcy5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGN1ck5vZGUgb2YgbmV3Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY3VyTm9kZS5fa2FNYiA9IHRoaXMuX2t0SWQ7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKGN1ck5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGVzW2ldLCB0aGlzLl9vcmlnU2libGluZyk7XG4gICAgICAgIHRoaXMuX2Vscy5wdXNoKHtcbiAgICAgICAgICAgIG5vZGU6IG5vZGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgX21haW50YWluTm9kZShpLCAkc2NvcGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Vscy5sZW5ndGggPCBpKzEpXG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtKCk7XG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5mb3JpZHggIT09IG51bGwpXG4gICAgICAgICAgICAkc2NvcGVbdGhpcy5fYXR0cnMuZm9yaWR4XSA9IGk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLmZvcmV2YWwgIT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9obHByLmtldmFsKHRoaXMuX2F0dHJzLmZvcmV2YWwsICRzY29wZSwgdGhpcyk7XG5cbiAgICAgICAgZm9yIChsZXQgY3VyTm9kZSBvZiB0aGlzLl9lbHNbaV0ubm9kZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWN1cnNpdmUoY3VyTm9kZSwgJHNjb3BlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCRzY29wZSkge1xuICAgICAgICBsZXQgX2Ffc2VsID0gdGhpcy5fYXR0cnMuZm9yc2VsZWN0O1xuICAgICAgICBsZXQgc2VsID0gdGhpcy5faGxwci5zY29wZUV2YWwoJHNjb3BlLCBfYV9zZWwpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgZm9yU2VsZWN0PVwiJHtfYV9zZWx9XCIgcmV0dXJuZWQ6YCwgc2VsZWN0LCBcIm9uIGNvbnRleHRcIiwgY29udGV4dCwgXCIoRWxlbWVudDogXCIsIHRoaXMub3V0ZXJIVE1MLCBcIilcIik7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgZm9yU2VsZWN0IHNlbGVjdG9yLiBzZWUgd2FyaW5nLlwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsID09PSBudWxsIHx8IHR5cGVvZiBzZWxbU3ltYm9sLml0ZXJhdG9yXSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2coYFNlbGVjdG9yICcke19hX3NlbH0nIGluIGZvciBzdGF0ZW1lbnQgaXMgbm90IGl0ZXJhYmxlLiBSZXR1cm5lZCB2YWx1ZTogYCwgc2VsLCBcImluXCIsIHRoaXMub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgU2VsZWN0b3IgJyR7X2Ffc2VsfScgaW4gZm9yIHN0YXRlbWVudCBpcyBub3QgaXRlcmFibGUuIFJldHVybmVkIHZhbHVlOiBgLCBzZWwsIFwiaW5cIiwgdGhpcy5vdXRlckhUTUwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3JpZ1NpYmxpbmcgPT09IGZhbHNlKVxuICAgICAgICAgICAgdGhpcy5fb3JpZ1NpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nO1xuXG5cbiAgICAgICAgbGV0IG4gPSAwO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2F0dHJzLmZvcm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpblwiOlxuICAgICAgICAgICAgICAgIGZvcihuIGluIHNlbCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGVbdGhpcy5fYXR0cnMuZm9yZGF0YV0gPSBuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpbk5vZGUobiwgJHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJvZlwiOlxuICAgICAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgb2Ygc2VsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlW3RoaXMuX2F0dHJzLmZvcmRhdGFdID0gaTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbnRhaW5Ob2RlKG4sICRzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJyZXBlYXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKG49MDsgbiA8IHNlbDsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZVt0aGlzLl9hdHRycy5mb3JkYXRhXSA9IG47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW50YWluTm9kZShuLCAkc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgZm9yIHR5cGUgJ1wiICsgdGhpcy5fYXR0cnMuZm9ybW9kZSArIFwiJyBpbiBcIiAuIHRoaXMub3V0ZXJIVE1MO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3IgKGxldCBpZHggPSBuOyBzZWwubGVuZ3RoIDwgdGhpcy5fZWxzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxzLnBvcCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgY3VyTm9kZSBvZiBlbGVtLm5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1ck5vZGUuX3JlbW92ZU5vZGVzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgIGN1ck5vZGUuX3JlbW92ZU5vZGVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGN1ck5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrYS1sb29wXCIsIEthTG9vcCwge2V4dGVuZHM6IFwidGVtcGxhdGVcIn0pOyIsInZhciBLQVNFTEYgPSBudWxsO1xuXG5jbGFzcyBLYVRwbCBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwiZGVidWdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInN0bXRcIjogbnVsbCxcbiAgICAgICAgICAgIFwiYWZ0ZXJyZW5kZXJcIjogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN3aXRjaGVkIHRvIHRvIGR1cmluZyBfaW5pdCgpIHRvIGFsbG93IDxzY3JpcHQ+IHRvIHNldCBzY29wZSB3aXRob3V0IHJlbmRlcmluZy5cbiAgICAgICAgdGhpcy5faXNJbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSB7fTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcInN0bXRcIiwgXCJkZWJ1Z1wiXTtcbiAgICB9XG5cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9sb2coXCJjb25uZWN0ZWRDYWxsYmFjaygpXCIsIHRoaXMpO1xuICAgICAgICBsZXQgYXV0byA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXV0b1wiKVxuICAgICAgICBpZiAoYXV0byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9nKFwiYXV0b3N0YXJ0OiBfaW5pdCgpXCIsIFwiZG9jdW1lbnQucmVhZHlTdGF0ZTogXCIsIGRvY3VtZW50LnJlYWR5U3RhdGUpO1xuXG4gICAgICAgICAgICBsZXQgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGF1dG8gPT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuJHNjb3BlKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV2YWwoYXV0byk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNjb3BlIGFuZCByZW5kZXIgdGhlIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBrYV90cGwoXCJ0cGwwMVwiKS4kc2NvcGUgPSB7bmFtZTogXCJib2JcIn07XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsXG4gICAgICovXG4gICAgc2V0ICRzY29wZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSB2YWw7XG5cbiAgICAgICAgLy8gUmVuZGVyIG9ubHkgaWYgZG9tIGF2YWlsYWJsZSAoYWxsb3cgPHNjcmlwdD4gaW5zaWRlIHRlbXBsYXRlIHRvIHNldCBzY29wZSBiZWZvcmUgZmlyc3QgcmVuZGVyaW5nXG4gICAgICAgIGlmICggISB0aGlzLl9pc0luaXRpYWxpemluZylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuX3Njb3BlKTtcbiAgICB9XG5cbiAgICBnZXQgJHNjb3BlKCkge1xuICAgICAgICBsZXQgaGFuZGxlciA9IHtcbiAgICAgICAgICAgIHNldDogKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwic2V0OlwiLCB0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHVwZGF0ZSBwcm94eSBkdXJpbmcgcmVuZGVyaW5nIChyZWN1cnNpb24pXG4gICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMuX2lzUmVuZGVyaW5nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLiRzY29wZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiICYmIHRhcmdldFtrZXldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldFtrZXldLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0aGlzLl9zY29wZSwgaGFuZGxlcik7XG4gICAgfVxuXG5cblxuICAgIF9pbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fZWxzICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGxvYWRlciBlbGVtZW50XG4gICAgICAgICAgICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKFwia2EtbG9hZGVyXCIpKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nO1xuICAgICAgICAobmV3IEt0VGVtcGxhdGVQYXJzZXIpLnBhcnNlUmVjdXJzaXZlKHRoaXMuY29udGVudCk7XG5cbiAgICAgICAgS0FTRUxGID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX2VscyA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKTtcblxuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAkc2NvcGUgPSB0aGlzLiRzY29wZTtcbiAgICAgICAgdGhpcy5fbG9nKFwicmVuZGVyKCRzY29wZT0gXCIsICRzY29wZSwgXCIpXCIpO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgZm9yKGxldCBjZSBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVjdXJzaXZlKGNlLCAkc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gZmFsc2U7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrYS10cGxcIiwgS2FUcGwsIHtleHRlbmRzOiBcInRlbXBsYXRlXCJ9KTsiLCJjbGFzcyBLYVZhbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7S3RIZWxwZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9rdEhscHIgPSBuZXcgS3RIZWxwZXIoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzdG10XCI6IG51bGwsXG4gICAgICAgICAgICBcImFmdGVycmVuZGVyXCI6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gW1wic3RtdFwiLCBcImFmdGVycmVuZGVyXCIsIFwiZGVidWdcIl07XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJOYW1lLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICB0aGlzLl9hdHRyc1thdHRyTmFtZV0gPSBuZXdWYWw7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcImF1dG9cIikpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih7fSk7XG4gICAgfVxuICAgIF9sb2coKSB7XG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5kZWJ1ZyAhPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgdGhpcy5fbG9nKGByZW5kZXIoYCwgJHNjb3BlLCBgKSBvbiAnJHt0aGlzLm91dGVySFRNTH0nYCk7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5fa3RIbHByLnNjb3BlRXZhbCgkc2NvcGUsIHRoaXMuX2F0dHJzLnN0bXQpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwidW5pbmRlbnRcIikpIHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5fa3RIbHByLnVuaW5kZW50VGV4dCh2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwiaHRtbFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MID0gdjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dHJzLmFmdGVycmVuZGVyICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIGV2YWwodGhpcy5fYXR0cnMuYWZ0ZXJyZW5kZXIpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtdmFsXCIsIEthVmFsKTsiLCJcblxuXG5jbGFzcyBLdElmIGV4dGVuZHMgS3RSZW5kZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcInN0bXRcIjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXCJzdG10XCJdO1xuICAgIH1cblxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgbGV0IGlzVHJ1ZSA9IHRoaXMuX2hscHIuc2NvcGVFdmFsKCRzY29wZSwgdGhpcy5fYXR0cnMuc3RtdCk7XG5cbiAgICAgICAgaWYgKCAhIGlzVHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTm9kZXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZWxzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtZW50c1RvUGFyZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjdXJOb2RlIG9mIHRoaXMuX2VscylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVjdXJzaXZlKGN1ck5vZGUsICRzY29wZSk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrdC1pZlwiLCBLdElmLCB7ZXh0ZW5kczogXCJ0ZW1wbGF0ZVwifSk7IiwiXG5cblxuY2xhc3MgS3RNYWludGFpbiBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwic3RtdFwiOiBudWxsLFxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXCJzdG10XCIsIFwiZGVidWdcIl07XG4gICAgfVxuXG5cbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTm9kZXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoJHNjb3BlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY3VyRWxlbWVudCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGN1ckVsZW1lbnQuaGFzQXR0cmlidXRlICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyTmFtZSBpbiBLVF9GTikge1xuICAgICAgICAgICAgICAgIGlmICggISBjdXJFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIEtUX0ZOW2F0dHJOYW1lXShjdXJFbGVtZW50LCBjdXJFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyTmFtZSksICRzY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlY3Vyc2l2ZShjdXJFbGVtZW50LCAkc2NvcGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrdC1tYWludGFpblwiLCBLdE1haW50YWluLCB7ZXh0ZW5kczogXCJ0ZW1wbGF0ZVwifSk7Il19
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva3QtaGVscGVyLmpzIiwiY29yZS9rdC1yZW5kZXJhYmxlLmpzIiwiY29yZS9LdFRlbXBsYXRlUGFyc2VyLmpzIiwiZnVuY3Rpb25zLmpzIiwia2EtaW5jbHVkZS5qcyIsImthLWxvb3AuanMiLCJrYS10cGwuanMiLCJrYS12YWwuanMiLCJrdC1pZi5qcyIsImt0LW1haW50YWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imthc2ltaXItdHBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jbGFzcyBLdEhlbHBlciB7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0bXRcbiAgICAgKiBAcGFyYW0ge2NvbnRleHR9IF9fc2NvcGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGtldmFsKHN0bXQsIF9fc2NvcGUsIGUpIHtcbiAgICAgICAgY29uc3QgcmVzZXJ2ZWQgPSBbXCJ2YXJcIiwgXCJudWxsXCIsIFwibGV0XCIsIFwiY29uc3RcIiwgXCJmdW5jdGlvblwiLCBcImNsYXNzXCIsIFwiaW5cIiwgXCJvZlwiLCBcImZvclwiLCBcInRydWVcIiwgXCJmYWxzZVwiXTtcbiAgICAgICAgbGV0IHIgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBfX25hbWUgaW4gX19zY29wZSkge1xuICAgICAgICAgICAgaWYgKHJlc2VydmVkLmluZGV4T2YoX19uYW1lKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICByICs9IGB2YXIgJHtfX25hbWV9ID0gX19zY29wZVsnJHtfX25hbWV9J107YFxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBzY29wZSB3YXMgY2xvbmVkLCB0aGUgb3JpZ2luYWwgd2lsbCBiZSBpbiAkc2NvcGUuIFRoaXMgaXMgaW1wb3J0YW50IHdoZW5cbiAgICAgICAgLy8gVXNpbmcgZXZlbnRzIFtvbi5jbGlja10sIGUuZy5cbiAgICAgICAgaWYgKHR5cGVvZiBfX3Njb3BlLiRzY29wZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgciArPSBcInZhciAkc2NvcGUgPSBfX3Njb3BlO1wiO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZXZhbChyICsgc3RtdClcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNhbm5vdCBldmFsKCkgc3RtdDogJ1wiICsgc3RtdCArIFwiJzogXCIgKyBleCArIFwiIG9uIGVsZW1lbnQgXCIsIGUub3V0ZXJIVE1MLCBcIihjb250ZXh0OlwiLCAkc2NvcGUsIFwiKVwiKTtcbiAgICAgICAgICAgIHRocm93IFwiZXZhbCgnXCIgKyBzdG10ICsgXCInKSBmYWlsZWQ6IFwiICsgZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRvIGJlIGV2YWwoKSdlZCByZWdpc3RlcmluZ1xuICAgICAqIGFsbCB0aGUgdmFyaWFibGVzIGluIHNjb3BlIHRvIG1ldGhvZCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJHNjb3BlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqXG4gICAgICovXG4gICAgc2NvcGVFdmFsKCRzY29wZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgcmVzZXJ2ZWQgPSBbXCJ2YXJcIiwgXCJudWxsXCIsIFwibGV0XCIsIFwiY29uc3RcIiwgXCJmdW5jdGlvblwiLCBcImNsYXNzXCIsIFwiaW5cIiwgXCJvZlwiLCBcImZvclwiLCBcInRydWVcIiwgXCJmYWxzZVwiXTtcbiAgICAgICAgbGV0IHIgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBfX25hbWUgaW4gJHNjb3BlKSB7XG4gICAgICAgICAgICBpZiAocmVzZXJ2ZWQuaW5kZXhPZihfX25hbWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHIgKz0gYHZhciAke19fbmFtZX0gPSAkc2NvcGVbJyR7X19uYW1lfSddO2BcbiAgICAgICAgfVxuICAgICAgICB2YXIgX192YWwgPSBudWxsO1xuICAgICAgICBsZXQgcyA9IGBfX3ZhbCA9ICR7c2VsZWN0b3J9O2A7XG4gICAgICAgIC8vY29uc29sZS5sb2cocik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBldmFsKHIgKyBzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgc2NvcGVFdmFsKCcke3J9JHtzfScpIGZhaWxlZDogJHtlfWApO1xuICAgICAgICAgICAgdGhyb3cgYGV2YWwoJyR7c30nKSBmYWlsZWQ6ICR7ZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX3ZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgRmluZCB0aGUgZmlyc3Qgd2hpdGVzcGFjZXMgaW4gdGV4dCBhbmQgcmVtb3ZlIHRoZW0gZnJvbSB0aGVcbiAgICAgKiAgc3RhcnQgb2YgdGhlIGZvbGxvd2luZyBsaW5lcy5cbiAgICAgKlxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gc3RyXG4gICAgICogIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB1bmluZGVudFRleHQoc3RyKSB7XG4gICAgICAgIGxldCBpID0gc3RyLm1hdGNoKC9cXG4oXFxzKikvbSlbMV07XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcbiR7aX1gLCBcImdcIiksIFwiXFxuXCIpO1xuICAgICAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuXG59IiwiXG52YXIgX0tUX0VMRU1FTlRfSUQgPSAwO1xuXG5jbGFzcyBLdFJlbmRlcmFibGUgZXh0ZW5kcyBIVE1MVGVtcGxhdGVFbGVtZW50IHtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtLdEhlbHBlcn1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faGxwciA9IG5ldyBLdEhlbHBlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcnJheSB3aXRoIGFsbCBvYnNlcnZlZCBlbGVtZW50cyBvZiB0aGlzIHRlbXBsYXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIG51bGwgaW5kaWNhdGVzLCB0aGUgdGVtcGxhdGUgd2FzIG5vdCB5ZXQgcmVuZGVyZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2VscyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2F0dHJzID0ge1wiZGVidWdcIjogZmFsc2V9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW50ZXJuYWwgZWxlbWVudCBpZCB0byBpZGVudGlmeSB3aGljaCBlbGVtZW50c1xuICAgICAgICAgKiB0byByZW5kZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2t0SWQgPSArK19LVF9FTEVNRU5UX0lEO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyTmFtZSwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fYXR0cnNbYXR0ck5hbWVdID0gbmV3VmFsO1xuICAgIH1cblxuICAgIF9sb2codjEsIHYyLCB2Mykge1xuICAgICAgICBsZXQgYSA9IFsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjXCIgKyB0aGlzLmlkICsgXCJbXCIgKyB0aGlzLl9rdElkICsgXCJdOlwiXTtcblxuICAgICAgICBmb3IgKGxldCBlIG9mIGFyZ3VtZW50cylcbiAgICAgICAgICAgIGEucHVzaChlKTtcblxuICAgICAgICBpZiAodGhpcy5fYXR0cnMuZGVidWcgIT09IGZhbHNlKVxuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkodGhpcywgYSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXYWxrIHRocm91Z2ggYWxsIGVsZW1lbnRzIGFuZCB0cnkgdG8gcmVuZGVyIHRoZW0uXG4gICAgICpcbiAgICAgKiBpZiBhIGVsZW1lbnQgaGFzIHRoZSBfa2FNYiAobWFpbnRhaW5lZCBieSkgcHJvcGVydHkgc2V0LFxuICAgICAqIGNoZWNrIGlmIGl0IGVxdWFscyB0aGlzLl9rYUlkICh0aGUgZWxlbWVudCBpZCkuIElmIG5vdCxcbiAgICAgKiBza2lwIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkc2NvcGVcbiAgICAgKi9cbiAgICByZW5kZXJSZWN1cnNpdmUobm9kZSwgJHNjb3BlKSB7XG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KFwiX2thTWJcIikgJiYgbm9kZS5fa2FNYiAhPT0gdGhpcy5fa3RJZClcbiAgICAgICAgICAgIHJldHVybjtcblxuXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbm9kZS5yZW5kZXIoJHNjb3BlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgY3VyTm9kZSBvZiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmt0U2tpcFJlbmRlciA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlY3Vyc2l2ZShjdXJOb2RlLCAkc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3JlbW92ZU5vZGVzKCkge1xuICAgICAgICBpZiAodGhpcy5fZWxzID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWwuX3JlbW92ZU5vZGVzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgZWwuX3JlbW92ZU5vZGVzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRFbGVtZW50ICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZSBhbmQgYXBwZW5kIGFsbCBlbGVtZW50cyBpblxuICAgICAqIGNvbnRlbnQgb2YgdGVtcGxhdGUgdG8gdGhlIG5leHQgc2libGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaWJsaW5nXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9hcHBlbmRFbGVtZW50c1RvUGFyZW50KHNpYmxpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzaWJsaW5nID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgc2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgbGV0IGNuID0gdGhpcy5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGhpcy5fZWxzID0gW107XG4gICAgICAgIGZvciAobGV0IGNlbCBvZiBjbi5jaGlsZHJlbikge1xuICAgICAgICAgICAgY2VsLl9rYU1iID0gdGhpcy5fa3RJZDtcbiAgICAgICAgICAgIHRoaXMuX2Vscy5wdXNoKGNlbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNuLCBzaWJsaW5nKTtcblxuICAgIH1cblxufVxuXG5cblxuIiwiXG5cbmNsYXNzIEt0VGVtcGxhdGVQYXJzZXIge1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudFxuICAgICAqIEByZXR1cm4ge251bGx9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcGFyc2VUZXh0Tm9kZSAodGV4dCwgZnJhZ21lbnQpIHtcbiAgICAgICAgbGV0IHNwbGl0ID0gdGV4dC5zcGxpdCgvKFxce1xce3xcXH1cXH0pLyk7XG4gICAgICAgIHdoaWxlKHNwbGl0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ldyBUZXh0KHNwbGl0LnNoaWZ0KCkpKTtcbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIHNwbGl0LnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgdmFsID0gbmV3IEthVmFsKCk7XG4gICAgICAgICAgICB2YWwuc2V0QXR0cmlidXRlKFwic3RtdFwiLCBzcGxpdC5zaGlmdCgpLnRyaW0oKSk7XG4gICAgICAgICAgICBzcGxpdC5zaGlmdCgpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqL1xuICAgIHBhcnNlUmVjdXJzaXZlKG5vZGUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIltrYS10cGxdIHBhcnNlUmVjdXJzaXZlKFwiLCBub2RlLCBcIilcIik7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgICAgZm9yIChsZXQgbiBvZiBub2RlLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VSZWN1cnNpdmUobik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSBcIlNDUklQVFwiKVxuICAgICAgICAgICAgcmV0dXJuOyAvLyBEb24ndCBwYXJzZSBiZXdlZW4gPHNjcmlwdD48L3NjcmlwdD4gdGFnc1xuXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5nZXRBdHRyaWJ1dGUgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAobm9kZS5rdFBhcnNlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBub2RlLmt0UGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGxldCB0ZXh0Tm9kZSBvZiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dE5vZGUuZGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBmcmFnbWVudCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVRleHROb2RlKHRleHROb2RlLmRhdGEsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIHRleHROb2RlLnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKFwiKmZvclwiKSkge1xuICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwge2lzOiBcImthLWxvb3BcIn0pO1xuICAgICAgICAgICAgbGV0IGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShcIipmb3JcIik7XG4gICAgICAgICAgICAvKiBAdmFyIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBuZXdOb2RlICovXG4gICAgICAgICAgICBsZXQgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBuZXdOb2RlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKTtcblxuICAgICAgICAgICAgbGV0IG1hID0gYXR0ci5tYXRjaCgvbGV0XFxzKyhcXFMqKVxccysoaW58b2Z8cmVwZWF0KVxccysoXFxTKikoXFxzK2luZGV4YnlcXHMrKFxcUyopKT8vKTtcbiAgICAgICAgICAgIGlmIChtYSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9ybW9kZVwiLCBtYVsyXSk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoXCJmb3JzZWxlY3RcIiwgbWFbM10pO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9yZGF0YVwiLCBtYVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYVs1XSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRBdHRyaWJ1dGUoXCJmb3JpZHhcIiwgbWFbNV0pO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShcIipmb3JldmFsXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwiZm9yZXZhbFwiLCBub2RlLmdldEF0dHJpYnV0ZShcIipmb3JldmFsXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IHBhcnNlICpmb3I9J1wiICsgYXR0ciArIFwiJyBmb3IgZWxlbWVudCBcIiArIG5vZGUub3V0ZXJIVE1MO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IGNsb25lTm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShcIippZlwiKSkge1xuICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwge2lzOiBcImt0LWlmXCJ9KTtcbiAgICAgICAgICAgIGxldCBhdHRyID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCIqaWZcIik7XG4gICAgICAgICAgICAvKiBAdmFyIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBuZXdOb2RlICovXG4gICAgICAgICAgICBsZXQgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBuZXdOb2RlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICAgIG5ld05vZGUuc2V0QXR0cmlidXRlKFwic3RtdFwiLCBhdHRyKTtcbiAgICAgICAgICAgIG5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZSk7XG4gICAgICAgICAgICBub2RlID0gY2xvbmVOb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNzc0NsYXNzZXMgPSBbXTtcbiAgICAgICAgbGV0IGt0Q2xhc3NlcyA9IG51bGw7XG4gICAgICAgIGxldCBhdHRycyA9IFtdO1xuICAgICAgICBsZXQgZXZlbnRzID0ge307XG4gICAgICAgIGxldCBzdHlsZXMgPSBbXTtcblxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlxcXFxbKC4rKVxcXFxdJFwiKTtcbiAgICAgICAgZm9yKGxldCBhdHRyTmFtZSBvZiBub2RlLmdldEF0dHJpYnV0ZU5hbWVzKCkpIHtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlZ2V4LmV4ZWMoYXR0ck5hbWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgbGV0IHNwbGl0ID0gcmVzdWx0WzFdLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhdHRycy5wdXNoKGAnJHtzcGxpdFswXX0nOiBgICsgbm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzcGxpdFswXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NsaXN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRbMV0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdENsYXNzZXMgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaChgJyR7c3BsaXRbMV19JzogYCArIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwib25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1tzcGxpdFsxXV0gPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKGAnJHtzcGxpdFsxXX0nOiBgICsgbm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIGF0dHJpYnV0ZSAnXCIgKyBhdHRyTmFtZSArIFwiJ1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdHRycy5sZW5ndGggPiAwIHx8IGNzc0NsYXNzZXMubGVuZ3RoID4gMCB8fCBrdENsYXNzZXMgIT09IG51bGwgfHwgT2JqZWN0LmtleXMoZXZlbnRzKS5sZW5ndGggPiAwIHx8IHN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiLCB7aXM6IFwia3QtbWFpbnRhaW5cIn0pO1xuICAgICAgICAgICAgLyogQHZhciB7SFRNTFRlbXBsYXRlRWxlbWVudH0gbmV3Tm9kZSAqL1xuICAgICAgICAgICAgbGV0IGNsb25lTm9kZSA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgbmV3Tm9kZS5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lTm9kZSk7XG5cblxuICAgICAgICAgICAgaWYgKGF0dHJzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgY2xvbmVOb2RlLnNldEF0dHJpYnV0ZShcImt0LWF0dHJzXCIsIFwie1wiICsgYXR0cnMuam9pbihcIixcIikgKyBcIn1cIik7XG5cbiAgICAgICAgICAgIGlmIChzdHlsZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3Qtc3R5bGVzXCIsIFwie1wiICsgc3R5bGVzLmpvaW4oXCIsXCIpICsgXCJ9XCIpO1xuXG4gICAgICAgICAgICBpZiAoa3RDbGFzc2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBbY2xhc3NsaXN0Ll09XCJ7Y2xhc3M6IGNvbmR9XCJcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3QtY2xhc3Nlc1wiLCBrdENsYXNzZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjc3NDbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwia3QtY2xhc3Nlc1wiLCBcIntcIiArIGNzc0NsYXNzZXMuam9pbihcIixcIikgKyBcIn1cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudHMpLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgY2xvbmVOb2RlLnNldEF0dHJpYnV0ZShcImt0LW9uXCIsIEpTT04uc3RyaW5naWZ5KGV2ZW50cykpO1xuXG4gICAgICAgICAgICBub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IGNsb25lTm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGN1ck5vZGUgb2Ygbm9kZS5jaGlsZHJlbilcbiAgICAgICAgICAgIHRoaXMucGFyc2VSZWN1cnNpdmUoY3VyTm9kZSk7XG5cblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKlxuICogQHJldHVybiBLYVRwbFxuICovXG5mdW5jdGlvbiBrYV90cGwoc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBLYVRwbClcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtIGluc3RhbmNlb2YgS2FUcGwpIHtcbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIHRocm93IGBTZWxlY3RvciAnJHtzZWxlY3Rvcn0nIGlzIG5vdCBhIDx0ZW1wbGF0ZSBpcz1cImthLXRwbFwiPiBlbGVtZW50YDtcbn1cblxuXG5cbnZhciBLVF9GTiA9IHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsXG4gICAgICogQHBhcmFtIHNjb3BlXG4gICAgICovXG4gICAgXCJrdC1jbGFzc2VzXCI6IGZ1bmN0aW9uKGVsZW0sIHZhbCwgc2NvcGUpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgICAgbGV0IGt0aGVscGVyID0gbmV3IEt0SGVscGVyKCk7XG4gICAgICAgIGxldCBjbGFzc2VzID0ga3RoZWxwZXIuc2NvcGVFdmFsKHNjb3BlLCB2YWwpO1xuICAgICAgICBmb3IgKGxldCBjbGFzc05hbWUgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKCAhIGNsYXNzZXMuaGFzT3duUHJvcGVydHkoY2xhc3NOYW1lKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChjbGFzc2VzW2NsYXNzTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICAgICAqIEBwYXJhbSBzY29wZVxuICAgICAqL1xuICAgIFwia3Qtc3R5bGVzXCI6IGZ1bmN0aW9uKGVsZW0sIHZhbCwgc2NvcGUpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgICAgbGV0IGt0aGVscGVyID0gbmV3IEt0SGVscGVyKCk7XG4gICAgICAgIGxldCBzdHlsZXMgPSBrdGhlbHBlci5zY29wZUV2YWwoc2NvcGUsIHZhbCk7XG4gICAgICAgIGZvciAobGV0IHN0eWxlTmFtZSBpbiBzdHlsZXMpIHtcbiAgICAgICAgICAgIGlmICggISBzdHlsZXMuaGFzT3duUHJvcGVydHkoc3R5bGVOYW1lKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChzdHlsZXNbc3R5bGVOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGVOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZU5hbWUsIHN0eWxlc1tzdHlsZU5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcImt0LWF0dHJzXCI6IGZ1bmN0aW9uIChlbGVtLCB2YWwsIHNjb3BlKSB7XG4gICAgICAgIGxldCBrdGhlbHBlciA9IG5ldyBLdEhlbHBlcigpO1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGt0aGVscGVyLnNjb3BlRXZhbChzY29wZSwgdmFsKTtcbiAgICAgICAgZm9yIChsZXQgY2xhc3NOYW1lIGluIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmICggISBjbGFzc2VzLmhhc093blByb3BlcnR5KGNsYXNzTmFtZSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoY2xhc3Nlc1tjbGFzc05hbWVdICE9PSBudWxsICYmIGNsYXNzZXNbY2xhc3NOYW1lXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShjbGFzc05hbWUsIGNsYXNzZXNbY2xhc3NOYW1lXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwia3Qtb25cIjogZnVuY3Rpb24gKGVsZW0sIHZhbCwgJHNjb3BlKSB7XG4gICAgICAgIGxldCBrdGhlbHBlciA9IG5ldyBLdEhlbHBlcigpO1xuXG4gICAgICAgIC8vIENsb25lIHRoZSBmaXJzdCBsYXllciBvZiB0aGUgc2NvcGUgc28gaXQgY2FuIGJlIGV2YWx1YXRlZCBvbiBldmVudFxuICAgICAgICBsZXQgc2F2ZVNjb3BlID0gey4uLiRzY29wZX07XG4gICAgICAgIHNhdmVTY29wZS4kc2NvcGUgPSAkc2NvcGU7XG5cbiAgICAgICAgbGV0IGV2ZW50cyA9IEpTT04ucGFyc2UodmFsKTtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICBlbGVtW1wib25cIiArIGV2ZW50XSA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAga3RoZWxwZXIua2V2YWwoZXZlbnRzW2V2ZW50XSwgc2F2ZVNjb3BlLCBlbGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn07IiwiXG5cbmNsYXNzIEthSW5jbHVkZSBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwic3JjXCI6IG51bGwsXG4gICAgICAgICAgICBcImF1dG9cIjogbnVsbCxcbiAgICAgICAgICAgIFwicmF3XCI6IG51bGwsXG4gICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcInNyY1wiLCBcImRlYnVnXCIsIFwiYXV0b1wiLCBcInJhd1wiXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIDxzY3JpcHQ+IHRhZ3MgdGhhdCB3ZXJlIGxvYWRlZCB2aWEgYWpheCB3b24ndCBiZSBleGVjdXRlZFxuICAgICAqIHdoZW4gYWRkZWQgdG8gZG9tLlxuICAgICAqXG4gICAgICogVGhlcmVmb3JlIHdlIGhhdmUgdG8gcmV3cml0ZSB0aGVtLiBUaGlzIG1ldGhvZCBkb2VzIHRoaXNcbiAgICAgKiBhdXRvbWF0aWNhbGx5IGJvdGggZm9yIG5vcm1hbCBhbmQgZm9yIHRlbXBsYXRlIChjb250ZW50KSBub2Rlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW1wb3J0U2NyaXRwUmVjdXJzaXZlKG5vZGUpIHtcbiAgICAgICAgbGV0IGNoZWxzID0gbm9kZSBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPyBub2RlLmNvbnRlbnQuY2hpbGROb2RlcyA6IG5vZGUuY2hpbGROb2RlcztcblxuICAgICAgICBmb3IgKGxldCBzIG9mIGNoZWxzKSB7XG4gICAgICAgICAgICBpZiAocy50YWdOYW1lICE9PSBcIlNDUklQVFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wb3J0U2NyaXRwUmVjdXJzaXZlKHMpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgbi5pbm5lckhUTUwgPSBzLmlubmVySFRNTDtcbiAgICAgICAgICAgIHMucmVwbGFjZVdpdGgobik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9sb2FkRGF0YVJlbW90ZSgpIHtcbiAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCB0aGlzLl9hdHRycy5zcmMpO1xuICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHR0cC5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbid0IGxvYWQgJ1wiICsgdGhpcy5wYXJhbXMuc3JjICsgXCInOiBcIiArIHhodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgPSB4aHR0cC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F0dHJzLnJhdyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBLdFRlbXBsYXRlUGFyc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIHAucGFyc2VSZWN1cnNpdmUodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBOb2RlcyBsb2FkZWQgZnJvbSByZW1vdGUgd29uJ3QgZ2V0IGV4ZWN1dGVkLiBTbyBpbXBvcnQgdGhlbS5cbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBvcnRTY3JpdHBSZWN1cnNpdmUodGhpcy5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nKFwidHJpZ2dlciBET01Db250ZW50TG9hZGVkIGV2ZW50IG9uXCIsIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJET01Db250ZW50TG9hZGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBsZXQgYXV0byA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXV0b1wiKTtcbiAgICAgICAgaWYgKGF1dG8gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZERhdGFSZW1vdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZERhdGFSZW1vdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLl9lbHMgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtZW50c1RvUGFyZW50KCk7XG5cblxuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtaW5jbHVkZVwiLCBLYUluY2x1ZGUsIHtleHRlbmRzOiBcInRlbXBsYXRlXCJ9KTsiLCJcblxuXG5jbGFzcyBLYUxvb3AgZXh0ZW5kcyBLdFJlbmRlcmFibGUge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb3JpZ1NpYmxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcImZvcnNlbGVjdFwiOiBudWxsLFxuICAgICAgICAgICAgXCJmb3Jtb2RlXCI6IG51bGwsXG4gICAgICAgICAgICBcImZvcmlkeFwiOiBudWxsLFxuICAgICAgICAgICAgXCJmb3JkYXRhXCI6IG51bGwsXG4gICAgICAgICAgICBcImZvcmV2YWxcIjogbnVsbFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VscyA9IFtdO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gW1wiZm9yc2VsZWN0XCIsIFwiZm9yaWR4XCIsIFwiZm9yZGF0YVwiLCBcImZvcmV2YWxcIiwgXCJmb3Jtb2RlXCJdO1xuICAgIH1cblxuXG4gICAgX2FwcGVuZEVsZW0oKSB7XG4gICAgICAgIGxldCBuZXdOb2RlID0gdGhpcy5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGN1ck5vZGUgb2YgbmV3Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY3VyTm9kZS5fa2FNYiA9IHRoaXMuX2t0SWQ7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKGN1ck5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGVzW2ldLCB0aGlzLl9vcmlnU2libGluZyk7XG4gICAgICAgIHRoaXMuX2Vscy5wdXNoKHtcbiAgICAgICAgICAgIG5vZGU6IG5vZGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgX21haW50YWluTm9kZShpLCAkc2NvcGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Vscy5sZW5ndGggPCBpKzEpXG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtKCk7XG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5mb3JpZHggIT09IG51bGwpXG4gICAgICAgICAgICAkc2NvcGVbdGhpcy5fYXR0cnMuZm9yaWR4XSA9IGk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLmZvcmV2YWwgIT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLl9obHByLmtldmFsKHRoaXMuX2F0dHJzLmZvcmV2YWwsICRzY29wZSwgdGhpcyk7XG5cbiAgICAgICAgZm9yIChsZXQgY3VyTm9kZSBvZiB0aGlzLl9lbHNbaV0ubm9kZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWN1cnNpdmUoY3VyTm9kZSwgJHNjb3BlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCRzY29wZSkge1xuICAgICAgICBsZXQgX2Ffc2VsID0gdGhpcy5fYXR0cnMuZm9yc2VsZWN0O1xuICAgICAgICBsZXQgc2VsID0gdGhpcy5faGxwci5zY29wZUV2YWwoJHNjb3BlLCBfYV9zZWwpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgZm9yU2VsZWN0PVwiJHtfYV9zZWx9XCIgcmV0dXJuZWQ6YCwgc2VsZWN0LCBcIm9uIGNvbnRleHRcIiwgY29udGV4dCwgXCIoRWxlbWVudDogXCIsIHRoaXMub3V0ZXJIVE1MLCBcIilcIik7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgZm9yU2VsZWN0IHNlbGVjdG9yLiBzZWUgd2FyaW5nLlwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsID09PSBudWxsIHx8IHR5cGVvZiBzZWxbU3ltYm9sLml0ZXJhdG9yXSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2coYFNlbGVjdG9yICcke19hX3NlbH0nIGluIGZvciBzdGF0ZW1lbnQgaXMgbm90IGl0ZXJhYmxlLiBSZXR1cm5lZCB2YWx1ZTogYCwgc2VsLCBcImluXCIsIHRoaXMub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgU2VsZWN0b3IgJyR7X2Ffc2VsfScgaW4gZm9yIHN0YXRlbWVudCBpcyBub3QgaXRlcmFibGUuIFJldHVybmVkIHZhbHVlOiBgLCBzZWwsIFwiaW5cIiwgdGhpcy5vdXRlckhUTUwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3JpZ1NpYmxpbmcgPT09IGZhbHNlKVxuICAgICAgICAgICAgdGhpcy5fb3JpZ1NpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nO1xuXG5cbiAgICAgICAgbGV0IG4gPSAwO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2F0dHJzLmZvcm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpblwiOlxuICAgICAgICAgICAgICAgIGZvcihuIGluIHNlbCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGVbdGhpcy5fYXR0cnMuZm9yZGF0YV0gPSBuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpbk5vZGUobiwgJHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJvZlwiOlxuICAgICAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgb2Ygc2VsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlW3RoaXMuX2F0dHJzLmZvcmRhdGFdID0gaTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbnRhaW5Ob2RlKG4sICRzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJyZXBlYXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKG49MDsgbiA8IHNlbDsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZVt0aGlzLl9hdHRycy5mb3JkYXRhXSA9IG47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW50YWluTm9kZShuLCAkc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgZm9yIHR5cGUgJ1wiICsgdGhpcy5fYXR0cnMuZm9ybW9kZSArIFwiJyBpbiBcIiAuIHRoaXMub3V0ZXJIVE1MO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3IgKGxldCBpZHggPSBuOyBzZWwubGVuZ3RoIDwgdGhpcy5fZWxzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxzLnBvcCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgY3VyTm9kZSBvZiBlbGVtLm5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1ck5vZGUuX3JlbW92ZU5vZGVzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgIGN1ck5vZGUuX3JlbW92ZU5vZGVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGN1ck5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrYS1sb29wXCIsIEthTG9vcCwge2V4dGVuZHM6IFwidGVtcGxhdGVcIn0pOyIsInZhciBLQVNFTEYgPSBudWxsO1xuXG5jbGFzcyBLYVRwbCBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwiZGVidWdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInN0bXRcIjogbnVsbCxcbiAgICAgICAgICAgIFwiYWZ0ZXJyZW5kZXJcIjogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN3aXRjaGVkIHRvIHRvIGR1cmluZyBfaW5pdCgpIHRvIGFsbG93IDxzY3JpcHQ+IHRvIHNldCBzY29wZSB3aXRob3V0IHJlbmRlcmluZy5cbiAgICAgICAgdGhpcy5faXNJbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSB7fTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcInN0bXRcIiwgXCJkZWJ1Z1wiXTtcbiAgICB9XG5cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9lbHMpXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9sb2coXCJjb25uZWN0ZWRDYWxsYmFjaygpXCIsIHRoaXMpO1xuICAgICAgICBsZXQgYXV0byA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXV0b1wiKVxuICAgICAgICBpZiAoYXV0byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9nKFwiYXV0b3N0YXJ0OiBfaW5pdCgpXCIsIFwiZG9jdW1lbnQucmVhZHlTdGF0ZTogXCIsIGRvY3VtZW50LnJlYWR5U3RhdGUpO1xuXG4gICAgICAgICAgICBsZXQgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGF1dG8gPT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuJHNjb3BlKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV2YWwoYXV0byk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNjb3BlIGFuZCByZW5kZXIgdGhlIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBrYV90cGwoXCJ0cGwwMVwiKS4kc2NvcGUgPSB7bmFtZTogXCJib2JcIn07XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsXG4gICAgICovXG4gICAgc2V0ICRzY29wZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSB2YWw7XG5cbiAgICAgICAgLy8gUmVuZGVyIG9ubHkgaWYgZG9tIGF2YWlsYWJsZSAoYWxsb3cgPHNjcmlwdD4gaW5zaWRlIHRlbXBsYXRlIHRvIHNldCBzY29wZSBiZWZvcmUgZmlyc3QgcmVuZGVyaW5nXG4gICAgICAgIGlmICggISB0aGlzLl9pc0luaXRpYWxpemluZylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuX3Njb3BlKTtcbiAgICB9XG5cbiAgICBnZXQgJHNjb3BlKCkge1xuICAgICAgICBsZXQgaGFuZGxlciA9IHtcbiAgICAgICAgICAgIHNldDogKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwic2V0OlwiLCB0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHVwZGF0ZSBwcm94eSBkdXJpbmcgcmVuZGVyaW5nIChyZWN1cnNpb24pXG4gICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMuX2lzUmVuZGVyaW5nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLiRzY29wZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSBcIm9iamVjdFwiICYmIHRhcmdldFtrZXldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldFtrZXldLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0aGlzLl9zY29wZSwgaGFuZGxlcik7XG4gICAgfVxuXG5cblxuICAgIF9pbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fZWxzICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGxvYWRlciBlbGVtZW50XG4gICAgICAgICAgICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKFwia2EtbG9hZGVyXCIpKVxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nO1xuICAgICAgICAobmV3IEt0VGVtcGxhdGVQYXJzZXIpLnBhcnNlUmVjdXJzaXZlKHRoaXMuY29udGVudCk7XG5cbiAgICAgICAgS0FTRUxGID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX2VscyA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKTtcblxuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAkc2NvcGUgPSB0aGlzLiRzY29wZTtcbiAgICAgICAgdGhpcy5fbG9nKFwicmVuZGVyKCRzY29wZT0gXCIsICRzY29wZSwgXCIpXCIpO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgZm9yKGxldCBjZSBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVjdXJzaXZlKGNlLCAkc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gZmFsc2U7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrYS10cGxcIiwgS2FUcGwsIHtleHRlbmRzOiBcInRlbXBsYXRlXCJ9KTsiLCJjbGFzcyBLYVZhbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7S3RIZWxwZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9rdEhscHIgPSBuZXcgS3RIZWxwZXIoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzdG10XCI6IG51bGwsXG4gICAgICAgICAgICBcImFmdGVycmVuZGVyXCI6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gW1wic3RtdFwiLCBcImFmdGVycmVuZGVyXCIsIFwiZGVidWdcIl07XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJOYW1lLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICB0aGlzLl9hdHRyc1thdHRyTmFtZV0gPSBuZXdWYWw7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcImF1dG9cIikpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih7fSk7XG4gICAgfVxuICAgIF9sb2coKSB7XG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5kZWJ1ZyAhPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgdGhpcy5fbG9nKGByZW5kZXIoYCwgJHNjb3BlLCBgKSBvbiAnJHt0aGlzLm91dGVySFRNTH0nYCk7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5fa3RIbHByLnNjb3BlRXZhbCgkc2NvcGUsIHRoaXMuX2F0dHJzLnN0bXQpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwidW5pbmRlbnRcIikpIHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5fa3RIbHByLnVuaW5kZW50VGV4dCh2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwiaHRtbFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MID0gdjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dHJzLmFmdGVycmVuZGVyICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIGV2YWwodGhpcy5fYXR0cnMuYWZ0ZXJyZW5kZXIpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtdmFsXCIsIEthVmFsKTsiLCJcblxuXG5jbGFzcyBLdElmIGV4dGVuZHMgS3RSZW5kZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSB7XG4gICAgICAgICAgICBcInN0bXRcIjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXCJzdG10XCJdO1xuICAgIH1cblxuICAgIHJlbmRlcigkc2NvcGUpIHtcbiAgICAgICAgbGV0IGlzVHJ1ZSA9IHRoaXMuX2hscHIuc2NvcGVFdmFsKCRzY29wZSwgdGhpcy5fYXR0cnMuc3RtdCk7XG5cbiAgICAgICAgaWYgKCAhIGlzVHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTm9kZXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZWxzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmRFbGVtZW50c1RvUGFyZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjdXJOb2RlIG9mIHRoaXMuX2VscylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVjdXJzaXZlKGN1ck5vZGUsICRzY29wZSk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrdC1pZlwiLCBLdElmLCB7ZXh0ZW5kczogXCJ0ZW1wbGF0ZVwifSk7IiwiXG5cblxuY2xhc3MgS3RNYWludGFpbiBleHRlbmRzIEt0UmVuZGVyYWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hdHRycyA9IHtcbiAgICAgICAgICAgIFwic3RtdFwiOiBudWxsLFxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXCJzdG10XCIsIFwiZGVidWdcIl07XG4gICAgfVxuXG5cbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTm9kZXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoJHNjb3BlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZEVsZW1lbnRzVG9QYXJlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY3VyRWxlbWVudCBvZiB0aGlzLl9lbHMpIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGN1ckVsZW1lbnQuaGFzQXR0cmlidXRlICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyTmFtZSBpbiBLVF9GTikge1xuICAgICAgICAgICAgICAgIGlmICggISBjdXJFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIEtUX0ZOW2F0dHJOYW1lXShjdXJFbGVtZW50LCBjdXJFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyTmFtZSksICRzY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlY3Vyc2l2ZShjdXJFbGVtZW50LCAkc2NvcGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJrdC1tYWludGFpblwiLCBLdE1haW50YWluLCB7ZXh0ZW5kczogXCJ0ZW1wbGF0ZVwifSk7Il19
/**
 * Infracamp's Kasimir Http Request
 *
 * Ajax Request library
 *
 * Repository: https://github.com/kasimirjs/kasmimir-http-request
 *
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */
/**
 * Start a new http request
 *
 *
 * @param url
 * @param params
 */
function ka_http_req(url, params={}) {
    return new KasimirHttpRequest(url, params);
}



class KasimirHttpRequest {

    constructor(url, params={}) {

        url = url.replace(/(\{|\:)([a-zA-Z0-9_\-]+)/g, (match, p1, p2) => {
            if ( ! params.hasOwnProperty(p2))
                throw "parameter '" + p2 + "' missing in url '" + url + "'";
            return encodeURI(params[p2]);
        });

        this.request = {
            url: url,
            method: "GET",
            body: null,
            headers: {},
            dataType: "text",
            onError: null,
            debug: false,
            data: null
        };


    }

    /**
     * Add additional query parameters to url
     *
     * @param params
     * @return {KasimirHttpRequest}
     */
    withParams(params) {
        if (this.request.url.indexOf("?") === -1) {
            this.request.url += "?";
        } else {
            this.request.url += "&";
        }
        let str = [];
        for (let name in params) {
            if (params.hasOwnProperty(name)) {
                str.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
            }
        }
        this.request.url += str.join("&");
        return this;
    }

    /**
     *
     * @param method
     * @return {KasimirHttpRequest}
     */
    withMethod(method) {
        this.request.method = method;
        return this;
    }

    /**
     *
     * @param token
     * @return {KasimirHttpRequest}
     */
    withBearerToken(token) {
        this.withHeaders({"authorization": "bearer " + token});
        return this;
    }


    /**
     *
     * @param headers
     * @return {KasimirHttpRequest}
     */
    withHeaders(headers) {
        Object.assign(this.request.headers, headers);
        return this;
    }


    /**
     *
     * @param body
     * @return {KasimirHttpRequest}
     */
    withBody(body) {
        if (this.request.method === "GET")
            this.request.method = "POST";
        if (Array.isArray(body) || typeof body === "object") {
            body = JSON.stringify(body);
            this.withHeaders({"content-type": "application/json"});
        }

        this.request.body = body;
        return this;
    }

    /**
     *
     * @param callback
     * @return {KasimirHttpRequest}
     */
    withOnError(callback) {
        this.request.onError = callback;
        return this;
    }

    /**
     * Switch debug mode on. Errors will trigger
     * a message and a alert window.
     *
     * @return {KasimirHttpRequest}
     */
    withDebug() {
        this.request.debug = true;
        return this;
    }

    set json(fn) {
        this.send((res) => {
            fn(res.getBodyJson());
        });
    }

    set plain(fn) {
        this.send((res) => {
            fn(res.getBody());
        })
    }


    /**
     *
     * @param fn
     * @param filter
     * @return
     */
    send(onSuccessFn) {
        let xhttp = new XMLHttpRequest();

        xhttp.open(this.request.method, this.request.url);
        for (let headerName in this.request.headers) {
            xhttp.setRequestHeader(headerName, this.request.headers[headerName]);
        }
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {

                if (this.request.onError !== null || parseInt(xhttp.status) >= 400) {
                    let errMsg = `𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗳𝗮𝗶𝗹𝗲𝗱 '${xhttp.status} ${xhttp.statusText}':`;
                    let errData = xhttp.response;
                    try {
                        errData = JSON.parse(errData);
                        errMsg += "\n\n𝗠𝘀𝗴: '" + errData.error.msg + "'\n\n"
                    } catch (e) {
                        errMsg += errData;
                    }

                    console.warn(errMsg, errData);
                    if (this.request.debug)
                        alert(errMsg + "\n𝘴𝘦𝘦 𝘤𝘰𝘯𝘴𝘰𝘭𝘦 𝘧𝘰𝘳 𝘥𝘦𝘵𝘢𝘪𝘭𝘴. (𝘥𝘦𝘣𝘶𝘨 𝘮𝘰𝘥𝘦 𝘰𝘯)");
                    if (typeof this.request.onError === "function")
                        this.request.onError(new KasimirHttpResponse(xhttp.response, xhttp.status, this));
                    return;
                }

                if (this.request.debug) {
                    let msg = xhttp.response;
                    try {
                        msg = JSON.parse(msg);
                    } catch (e) {
                        // cannot parse json - output plain
                    }
                    console.debug(`𝗥𝗲𝗾𝘂𝗲𝘀𝘁: ${xhttp.status} ${xhttp.statusText}':\n`, msg);
                }

                onSuccessFn(new KasimirHttpResponse(xhttp.response, xhttp.status, this));
                return;
            }

        };

        xhttp.send(this.request.body);
    }

}


class KasimirHttpResponse {


    constructor (body, status, request) {
        this.body = body;
        this.status = status;
        this.request = request;
    }

    /**
     *
     * @return {object}
     */
    getBodyJson() {
        return JSON.parse(this.body)
    }

    /**
     *
     * @return {string}
     */
    getBody() {
        return this.body;
    }

    /**
     *
     * @return {boolean}
     */
    isOk() {
        return this.status === 200;
    }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImthLWh0dHAtcmVxLmpzIiwia2FzaW1pci1odHRwLXJlcXVlc3QuanMiLCJLYXNpbWlySHR0cFJlc3BvbnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLWh0dHAtcmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhcnQgYSBuZXcgaHR0cCByZXF1ZXN0XG4gKlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZnVuY3Rpb24ga2FfaHR0cF9yZXEodXJsLCBwYXJhbXM9e30pIHtcbiAgICByZXR1cm4gbmV3IEthc2ltaXJIdHRwUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59XG4iLCJcblxuY2xhc3MgS2FzaW1pckh0dHBSZXF1ZXN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCwgcGFyYW1zPXt9KSB7XG5cbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoLyhcXHt8XFw6KShbYS16QS1aMC05X1xcLV0rKS9nLCAobWF0Y2gsIHAxLCBwMikgPT4ge1xuICAgICAgICAgICAgaWYgKCAhIHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwMikpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJwYXJhbWV0ZXIgJ1wiICsgcDIgKyBcIicgbWlzc2luZyBpbiB1cmwgJ1wiICsgdXJsICsgXCInXCI7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJKHBhcmFtc1twMl0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlcXVlc3QgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIG9uRXJyb3I6IG51bGwsXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBkYXRhOiBudWxsXG4gICAgICAgIH07XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhZGRpdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gdXJsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybiB7S2FzaW1pckh0dHBSZXF1ZXN0fVxuICAgICAqL1xuICAgIHdpdGhQYXJhbXMocGFyYW1zKSB7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3QudXJsLmluZGV4T2YoXCI/XCIpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnVybCArPSBcIj9cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC51cmwgKz0gXCImXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0ciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1tuYW1lXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdC51cmwgKz0gc3RyLmpvaW4oXCImXCIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2RcbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aE1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9rZW5cbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aEJlYXJlclRva2VuKHRva2VuKSB7XG4gICAgICAgIHRoaXMud2l0aEhlYWRlcnMoe1wiYXV0aG9yaXphdGlvblwiOiBcImJlYXJlciBcIiArIHRva2VufSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaGVhZGVyc1xuICAgICAqIEByZXR1cm4ge0thc2ltaXJIdHRwUmVxdWVzdH1cbiAgICAgKi9cbiAgICB3aXRoSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5yZXF1ZXN0LmhlYWRlcnMsIGhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGJvZHlcbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aEJvZHkoYm9keSkge1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0Lm1ldGhvZCA9PT0gXCJHRVRcIilcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5tZXRob2QgPSBcIlBPU1RcIjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYm9keSkgfHwgdHlwZW9mIGJvZHkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIHRoaXMud2l0aEhlYWRlcnMoe1wiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVlc3QuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7S2FzaW1pckh0dHBSZXF1ZXN0fVxuICAgICAqL1xuICAgIHdpdGhPbkVycm9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdC5vbkVycm9yID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkZWJ1ZyBtb2RlIG9uLiBFcnJvcnMgd2lsbCB0cmlnZ2VyXG4gICAgICogYSBtZXNzYWdlIGFuZCBhIGFsZXJ0IHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0thc2ltaXJIdHRwUmVxdWVzdH1cbiAgICAgKi9cbiAgICB3aXRoRGVidWcoKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdC5kZWJ1ZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldCBqc29uKGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZCgocmVzKSA9PiB7XG4gICAgICAgICAgICBmbihyZXMuZ2V0Qm9keUpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldCBwbGFpbihmbikge1xuICAgICAgICB0aGlzLnNlbmQoKHJlcykgPT4ge1xuICAgICAgICAgICAgZm4ocmVzLmdldEJvZHkoKSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmblxuICAgICAqIEBwYXJhbSBmaWx0ZXJcbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgc2VuZChvblN1Y2Nlc3NGbikge1xuICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICB4aHR0cC5vcGVuKHRoaXMucmVxdWVzdC5tZXRob2QsIHRoaXMucmVxdWVzdC51cmwpO1xuICAgICAgICBmb3IgKGxldCBoZWFkZXJOYW1lIGluIHRoaXMucmVxdWVzdC5oZWFkZXJzKSB7XG4gICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIHRoaXMucmVxdWVzdC5oZWFkZXJzW2hlYWRlck5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PT0gNCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5vbkVycm9yICE9PSBudWxsIHx8IHBhcnNlSW50KHhodHRwLnN0YXR1cykgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJNc2cgPSBg8J2XpfCdl7LwnZe+8J2YgvCdl7LwnZiA8J2YgSDwnZez8J2XrvCdl7bwnZe58J2XsvCdl7EgJyR7eGh0dHAuc3RhdHVzfSAke3hodHRwLnN0YXR1c1RleHR9JzpgO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyRGF0YSA9IHhodHRwLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGF0YSA9IEpTT04ucGFyc2UoZXJyRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJNc2cgKz0gXCJcXG5cXG7wnZeg8J2YgPCdl7Q6ICdcIiArIGVyckRhdGEuZXJyb3IubXNnICsgXCInXFxuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnICs9IGVyckRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyTXNnLCBlcnJEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVyck1zZyArIFwiXFxu8J2YtPCdmKbwnZimIPCdmKTwnZiw8J2Yr/CdmLTwnZiw8J2YrfCdmKYg8J2Yp/CdmLDwnZizIPCdmKXwnZim8J2YtfCdmKLwnZiq8J2YrfCdmLQuICjwnZil8J2YpvCdmKPwnZi28J2YqCDwnZiu8J2YsPCdmKXwnZimIPCdmLDwnZivKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVlc3Qub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Lm9uRXJyb3IobmV3IEthc2ltaXJIdHRwUmVzcG9uc2UoeGh0dHAucmVzcG9uc2UsIHhodHRwLnN0YXR1cywgdGhpcykpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0geGh0dHAucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBKU09OLnBhcnNlKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbm5vdCBwYXJzZSBqc29uIC0gb3V0cHV0IHBsYWluXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1Zyhg8J2XpfCdl7LwnZe+8J2YgvCdl7LwnZiA8J2YgTogJHt4aHR0cC5zdGF0dXN9ICR7eGh0dHAuc3RhdHVzVGV4dH0nOlxcbmAsIG1zZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzRm4obmV3IEthc2ltaXJIdHRwUmVzcG9uc2UoeGh0dHAucmVzcG9uc2UsIHhodHRwLnN0YXR1cywgdGhpcykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHhodHRwLnNlbmQodGhpcy5yZXF1ZXN0LmJvZHkpO1xuICAgIH1cblxufSIsIlxuXG5jbGFzcyBLYXNpbWlySHR0cFJlc3BvbnNlIHtcblxuXG4gICAgY29uc3RydWN0b3IgKGJvZHksIHN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCb2R5SnNvbigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5ib2R5KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEJvZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzT2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gMjAwO1xuICAgIH1cblxufSJdfQ==
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImthLWh0dHAtcmVxLmpzIiwia2FzaW1pci1odHRwLXJlcXVlc3QuanMiLCJLYXNpbWlySHR0cFJlc3BvbnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLWh0dHAtcmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhcnQgYSBuZXcgaHR0cCByZXF1ZXN0XG4gKlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZnVuY3Rpb24ga2FfaHR0cF9yZXEodXJsLCBwYXJhbXM9e30pIHtcbiAgICByZXR1cm4gbmV3IEthc2ltaXJIdHRwUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59XG4iLCJcblxuY2xhc3MgS2FzaW1pckh0dHBSZXF1ZXN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCwgcGFyYW1zPXt9KSB7XG5cbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoLyhcXHt8XFw6KShbYS16QS1aMC05X1xcLV0rKS9nLCAobWF0Y2gsIHAxLCBwMikgPT4ge1xuICAgICAgICAgICAgaWYgKCAhIHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwMikpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJwYXJhbWV0ZXIgJ1wiICsgcDIgKyBcIicgbWlzc2luZyBpbiB1cmwgJ1wiICsgdXJsICsgXCInXCI7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJKHBhcmFtc1twMl0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlcXVlc3QgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIG9uRXJyb3I6IG51bGwsXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBkYXRhOiBudWxsXG4gICAgICAgIH07XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhZGRpdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gdXJsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybiB7S2FzaW1pckh0dHBSZXF1ZXN0fVxuICAgICAqL1xuICAgIHdpdGhQYXJhbXMocGFyYW1zKSB7XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3QudXJsLmluZGV4T2YoXCI/XCIpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnVybCArPSBcIj9cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC51cmwgKz0gXCImXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0ciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1tuYW1lXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdC51cmwgKz0gc3RyLmpvaW4oXCImXCIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2RcbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aE1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9rZW5cbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aEJlYXJlclRva2VuKHRva2VuKSB7XG4gICAgICAgIHRoaXMud2l0aEhlYWRlcnMoe1wiYXV0aG9yaXphdGlvblwiOiBcImJlYXJlciBcIiArIHRva2VufSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaGVhZGVyc1xuICAgICAqIEByZXR1cm4ge0thc2ltaXJIdHRwUmVxdWVzdH1cbiAgICAgKi9cbiAgICB3aXRoSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5yZXF1ZXN0LmhlYWRlcnMsIGhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGJvZHlcbiAgICAgKiBAcmV0dXJuIHtLYXNpbWlySHR0cFJlcXVlc3R9XG4gICAgICovXG4gICAgd2l0aEJvZHkoYm9keSkge1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0Lm1ldGhvZCA9PT0gXCJHRVRcIilcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5tZXRob2QgPSBcIlBPU1RcIjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYm9keSkgfHwgdHlwZW9mIGJvZHkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIHRoaXMud2l0aEhlYWRlcnMoe1wiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVlc3QuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7S2FzaW1pckh0dHBSZXF1ZXN0fVxuICAgICAqL1xuICAgIHdpdGhPbkVycm9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdC5vbkVycm9yID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkZWJ1ZyBtb2RlIG9uLiBFcnJvcnMgd2lsbCB0cmlnZ2VyXG4gICAgICogYSBtZXNzYWdlIGFuZCBhIGFsZXJ0IHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0thc2ltaXJIdHRwUmVxdWVzdH1cbiAgICAgKi9cbiAgICB3aXRoRGVidWcoKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdC5kZWJ1ZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldCBqc29uKGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZCgocmVzKSA9PiB7XG4gICAgICAgICAgICBmbihyZXMuZ2V0Qm9keUpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldCBwbGFpbihmbikge1xuICAgICAgICB0aGlzLnNlbmQoKHJlcykgPT4ge1xuICAgICAgICAgICAgZm4ocmVzLmdldEJvZHkoKSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmblxuICAgICAqIEBwYXJhbSBmaWx0ZXJcbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgc2VuZChvblN1Y2Nlc3NGbikge1xuICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICB4aHR0cC5vcGVuKHRoaXMucmVxdWVzdC5tZXRob2QsIHRoaXMucmVxdWVzdC51cmwpO1xuICAgICAgICBmb3IgKGxldCBoZWFkZXJOYW1lIGluIHRoaXMucmVxdWVzdC5oZWFkZXJzKSB7XG4gICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIHRoaXMucmVxdWVzdC5oZWFkZXJzW2hlYWRlck5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PT0gNCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5vbkVycm9yICE9PSBudWxsIHx8IHBhcnNlSW50KHhodHRwLnN0YXR1cykgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJNc2cgPSBg8J2XpfCdl7LwnZe+8J2YgvCdl7LwnZiA8J2YgSDwnZez8J2XrvCdl7bwnZe58J2XsvCdl7EgJyR7eGh0dHAuc3RhdHVzfSAke3hodHRwLnN0YXR1c1RleHR9JzpgO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyRGF0YSA9IHhodHRwLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRGF0YSA9IEpTT04ucGFyc2UoZXJyRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJNc2cgKz0gXCJcXG5cXG7wnZeg8J2YgPCdl7Q6ICdcIiArIGVyckRhdGEuZXJyb3IubXNnICsgXCInXFxuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnICs9IGVyckRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyTXNnLCBlcnJEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVyck1zZyArIFwiXFxu8J2YtPCdmKbwnZimIPCdmKTwnZiw8J2Yr/CdmLTwnZiw8J2YrfCdmKYg8J2Yp/CdmLDwnZizIPCdmKXwnZim8J2YtfCdmKLwnZiq8J2YrfCdmLQuICjwnZil8J2YpvCdmKPwnZi28J2YqCDwnZiu8J2YsPCdmKXwnZimIPCdmLDwnZivKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVlc3Qub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Lm9uRXJyb3IobmV3IEthc2ltaXJIdHRwUmVzcG9uc2UoeGh0dHAucmVzcG9uc2UsIHhodHRwLnN0YXR1cywgdGhpcykpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0geGh0dHAucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBKU09OLnBhcnNlKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbm5vdCBwYXJzZSBqc29uIC0gb3V0cHV0IHBsYWluXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1Zyhg8J2XpfCdl7LwnZe+8J2YgvCdl7LwnZiA8J2YgTogJHt4aHR0cC5zdGF0dXN9ICR7eGh0dHAuc3RhdHVzVGV4dH0nOlxcbmAsIG1zZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzRm4obmV3IEthc2ltaXJIdHRwUmVzcG9uc2UoeGh0dHAucmVzcG9uc2UsIHhodHRwLnN0YXR1cywgdGhpcykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHhodHRwLnNlbmQodGhpcy5yZXF1ZXN0LmJvZHkpO1xuICAgIH1cblxufSIsIlxuXG5jbGFzcyBLYXNpbWlySHR0cFJlc3BvbnNlIHtcblxuXG4gICAgY29uc3RydWN0b3IgKGJvZHksIHN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCb2R5SnNvbigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5ib2R5KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEJvZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzT2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gMjAwO1xuICAgIH1cblxufSJdfQ==
/**
 * Infracamp's Kasimir Templates
 *
 * A no-dependency render on request
 *
 * @author Matthias Leuffen <m@tth.es>
 */

/**
 *
 * @param selector
 * @return {KasimirForm}
 */
function ka_form(selector) {
    if (selector instanceof KasimirForm)
        return selector;
    let elem = document.getElementById(selector);
    if (elem === null)
        throw `Selector '${selector}' not found (no element mit id)`;
    if (elem instanceof KasimirForm) {
        return elem;
    }
    throw `Selector '${selector}' is not a <form is="ka-form"> element`;
}




class KasimirForm extends HTMLFormElement {


    constructor() {
        super();
        this._data = {};
        this.params = {
            "debounce": 200
        };
        this._debounder = null;
        this._formEls = [];

        var self = this;
        this.addEventListener("submit", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }


    _updateElCon() {
        for (let el of this.querySelectorAll("input,select,textarea")) {

            this._formEls.push(el);
            if (el._kasiFormI === true)
                continue;
            el._kasiFormI = true;
            if (el instanceof HTMLSelectElement) {
                el.addEventListener("change", (e) => {
                    this.dispatchEvent(new Event("change"));
                });
            } else {
                el.addEventListener("keyup", (e) => {
                    window.clearTimeout(this._debounder);
                    if (e.key === "Enter") {
                        return;
                    }
                    this._debounder = window.setTimeout(() => {this.dispatchEvent(new Event("change"))}, this.params.debounce)
                })
            }
        }
    }



    /**
     * Get the form data as object with key-value pair
     *
     * ```
     * Example:
     *
     * let data = ka_form("formId").data;
     * for (let key in data)
     *      console.log (`data[${name}]=${data[name]}`);
     * ```
     *
     * @return {object}
     */
    get $data() {
        let getVal = (el) => {
            switch (el.tagName) {
                case "INPUT":
                    switch (el.type) {
                        case "checkbox":
                        case "radio":
                            if (el.checked == true)
                                return el.value;
                            return null;
                    }
                case "SELECT":
                case "TEXTAREA":
                    return el.value;
            }
        };

        for (let el of this._formEls) {
            if (el.name === "")
                continue;
            this._data[el.name] = getVal(el);
        }
        return this._data;
    }

    /**
     * Set the data form form as object
     *
     * ```
     * ka_form("formId").data = {
     *     "name1": "val1"
     * }
     * ```
     *
     * @param {object} newData
     */
    set $data (newData) {
        this._data = newData;
        for (let el of this._formEls) {
            let cdata = newData[el.name];
            if (typeof cdata === "undefined")
                cdata = "";
            if (el.tagName === "INPUT" && el.type === "checkbox" || el.type === "radio") {
                if (cdata === el.value) {
                    el.checked = true;
                } else {
                    el.checked = false;
                }
            } else {
                el.value = cdata;
            }
        }
    }

    disconnectedCallback() {
        this._observer.disconnect();
    }

    connectedCallback() {

        this._observer = new MutationObserver((e) => {
            this._updateElCon();
        });
        this._observer.observe(this, {childList: true, subtree: true});
        this._updateElCon();
    }


}

customElements.define("ka-form", KasimirForm, {extends: "form"});

class KasimirSelect extends HTMLSelectElement {


    constructor() {
        super();
        this.__$options = [];
    }


    _updateOptions() {
        //console.log("updateOptions()");
        this.innerHTML = "";
        for(let option of this.__$options) {
            let optEl = document.createElement("option");
            if (typeof option === "object") {
                optEl.value = option.value;
                optEl.innerText = option.text;
            } else {
                optEl.value = option;
                optEl.innerText = option;
            }
            this.appendChild(optEl);
        }
    }


    connectedCallback() {
        let iniOptions = this.$options;
        let value = this.$value;

        // Getters / Setters not possible if property already defined.
        // This happens if element is loaded before js
        // Therefor: apply only on connect and keep the property value
        Object.defineProperty(this, '$options', {
            set: (val) => {
                this.__$options = val;
                this._updateOptions();
            },
            get: (val) => {
                return this.__$options
            }
        });
        Object.defineProperty(this, '$value', {
            set: (val) => {
                this.value = val;
            },
            get: (val) => {
                return this.value;
            }
        });
        if (typeof iniOptions !== "undefined")
            this.$options = iniOptions;
        if (typeof value !== "undefined")
            this.$value = value;
    }


}

customElements.define("ka-select", KasimirSelect, {extends: "select"});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZ1bmN0aW9uLmpzIiwia2FzaW1pci1mb3JtLmpzIiwia2FzaW1pci1zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQHJldHVybiB7S2FzaW1pckZvcm19XG4gKi9cbmZ1bmN0aW9uIGthX2Zvcm0oc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBLYXNpbWlyRm9ybSlcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtID09PSBudWxsKVxuICAgICAgICB0aHJvdyBgU2VsZWN0b3IgJyR7c2VsZWN0b3J9JyBub3QgZm91bmQgKG5vIGVsZW1lbnQgbWl0IGlkKWA7XG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBLYXNpbWlyRm9ybSkge1xuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgdGhyb3cgYFNlbGVjdG9yICcke3NlbGVjdG9yfScgaXMgbm90IGEgPGZvcm0gaXM9XCJrYS1mb3JtXCI+IGVsZW1lbnRgO1xufSIsIlxuXG5cblxuY2xhc3MgS2FzaW1pckZvcm0gZXh0ZW5kcyBIVE1MRm9ybUVsZW1lbnQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgICAgIFwiZGVib3VuY2VcIjogMjAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2RlYm91bmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Zvcm1FbHMgPSBbXTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBfdXBkYXRlRWxDb24oKSB7XG4gICAgICAgIGZvciAobGV0IGVsIG9mIHRoaXMucXVlcnlTZWxlY3RvckFsbChcImlucHV0LHNlbGVjdCx0ZXh0YXJlYVwiKSkge1xuXG4gICAgICAgICAgICB0aGlzLl9mb3JtRWxzLnB1c2goZWwpO1xuICAgICAgICAgICAgaWYgKGVsLl9rYXNpRm9ybUkgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBlbC5fa2FzaUZvcm1JID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZGVib3VuZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJvdW5kZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiKSl9LCB0aGlzLnBhcmFtcy5kZWJvdW5jZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZm9ybSBkYXRhIGFzIG9iamVjdCB3aXRoIGtleS12YWx1ZSBwYWlyXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogbGV0IGRhdGEgPSBrYV9mb3JtKFwiZm9ybUlkXCIpLmRhdGE7XG4gICAgICogZm9yIChsZXQga2V5IGluIGRhdGEpXG4gICAgICogICAgICBjb25zb2xlLmxvZyAoYGRhdGFbJHtuYW1lfV09JHtkYXRhW25hbWVdfWApO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAkZGF0YSgpIHtcbiAgICAgICAgbGV0IGdldFZhbCA9IChlbCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlbC50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZWwudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNoZWNrYm94XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFkaW9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2hlY2tlZCA9PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlRFWFRBUkVBXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9mb3JtRWxzKSB7XG4gICAgICAgICAgICBpZiAoZWwubmFtZSA9PT0gXCJcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbZWwubmFtZV0gPSBnZXRWYWwoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0YSBmb3JtIGZvcm0gYXMgb2JqZWN0XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBrYV9mb3JtKFwiZm9ybUlkXCIpLmRhdGEgPSB7XG4gICAgICogICAgIFwibmFtZTFcIjogXCJ2YWwxXCJcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV3RGF0YVxuICAgICAqL1xuICAgIHNldCAkZGF0YSAobmV3RGF0YSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3RGF0YTtcbiAgICAgICAgZm9yIChsZXQgZWwgb2YgdGhpcy5fZm9ybUVscykge1xuICAgICAgICAgICAgbGV0IGNkYXRhID0gbmV3RGF0YVtlbC5uYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2RhdGEgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgY2RhdGEgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBlbC50eXBlID09PSBcImNoZWNrYm94XCIgfHwgZWwudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNkYXRhID09PSBlbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC52YWx1ZSA9IGNkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVFbENvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUVsQ29uKCk7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtZm9ybVwiLCBLYXNpbWlyRm9ybSwge2V4dGVuZHM6IFwiZm9ybVwifSk7IiwiXG5jbGFzcyBLYXNpbWlyU2VsZWN0IGV4dGVuZHMgSFRNTFNlbGVjdEVsZW1lbnQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fXyRvcHRpb25zID0gW107XG4gICAgfVxuXG5cbiAgICBfdXBkYXRlT3B0aW9ucygpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInVwZGF0ZU9wdGlvbnMoKVwiKTtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IG9wdGlvbiBvZiB0aGlzLl9fJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBvcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIG9wdEVsLnZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIG9wdEVsLmlubmVyVGV4dCA9IG9wdGlvbi50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRFbC52YWx1ZSA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICBvcHRFbC5pbm5lclRleHQgPSBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG9wdEVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGxldCBpbmlPcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy4kdmFsdWU7XG5cbiAgICAgICAgLy8gR2V0dGVycyAvIFNldHRlcnMgbm90IHBvc3NpYmxlIGlmIHByb3BlcnR5IGFscmVhZHkgZGVmaW5lZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIGlmIGVsZW1lbnQgaXMgbG9hZGVkIGJlZm9yZSBqc1xuICAgICAgICAvLyBUaGVyZWZvcjogYXBwbHkgb25seSBvbiBjb25uZWN0IGFuZCBrZWVwIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJyRvcHRpb25zJywge1xuICAgICAgICAgICAgc2V0OiAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fXyRvcHRpb25zID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fXyRvcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJyR2YWx1ZScsIHtcbiAgICAgICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIGluaU9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB0aGlzLiRvcHRpb25zID0gaW5pT3B0aW9ucztcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2Etc2VsZWN0XCIsIEthc2ltaXJTZWxlY3QsIHtleHRlbmRzOiBcInNlbGVjdFwifSk7Il19
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZ1bmN0aW9uLmpzIiwia2FzaW1pci1mb3JtLmpzIiwia2FzaW1pci1zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJrYXNpbWlyLWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQHJldHVybiB7S2FzaW1pckZvcm19XG4gKi9cbmZ1bmN0aW9uIGthX2Zvcm0oc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBLYXNpbWlyRm9ybSlcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtID09PSBudWxsKVxuICAgICAgICB0aHJvdyBgU2VsZWN0b3IgJyR7c2VsZWN0b3J9JyBub3QgZm91bmQgKG5vIGVsZW1lbnQgbWl0IGlkKWA7XG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBLYXNpbWlyRm9ybSkge1xuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgdGhyb3cgYFNlbGVjdG9yICcke3NlbGVjdG9yfScgaXMgbm90IGEgPGZvcm0gaXM9XCJrYS1mb3JtXCI+IGVsZW1lbnRgO1xufSIsIlxuXG5cblxuY2xhc3MgS2FzaW1pckZvcm0gZXh0ZW5kcyBIVE1MRm9ybUVsZW1lbnQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgICAgIFwiZGVib3VuY2VcIjogMjAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2RlYm91bmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Zvcm1FbHMgPSBbXTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBfdXBkYXRlRWxDb24oKSB7XG4gICAgICAgIGZvciAobGV0IGVsIG9mIHRoaXMucXVlcnlTZWxlY3RvckFsbChcImlucHV0LHNlbGVjdCx0ZXh0YXJlYVwiKSkge1xuXG4gICAgICAgICAgICB0aGlzLl9mb3JtRWxzLnB1c2goZWwpO1xuICAgICAgICAgICAgaWYgKGVsLl9rYXNpRm9ybUkgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBlbC5fa2FzaUZvcm1JID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZGVib3VuZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJvdW5kZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiKSl9LCB0aGlzLnBhcmFtcy5kZWJvdW5jZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZm9ybSBkYXRhIGFzIG9iamVjdCB3aXRoIGtleS12YWx1ZSBwYWlyXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogbGV0IGRhdGEgPSBrYV9mb3JtKFwiZm9ybUlkXCIpLmRhdGE7XG4gICAgICogZm9yIChsZXQga2V5IGluIGRhdGEpXG4gICAgICogICAgICBjb25zb2xlLmxvZyAoYGRhdGFbJHtuYW1lfV09JHtkYXRhW25hbWVdfWApO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAkZGF0YSgpIHtcbiAgICAgICAgbGV0IGdldFZhbCA9IChlbCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlbC50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZWwudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNoZWNrYm94XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFkaW9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2hlY2tlZCA9PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlRFWFRBUkVBXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBlbCBvZiB0aGlzLl9mb3JtRWxzKSB7XG4gICAgICAgICAgICBpZiAoZWwubmFtZSA9PT0gXCJcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbZWwubmFtZV0gPSBnZXRWYWwoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0YSBmb3JtIGZvcm0gYXMgb2JqZWN0XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBrYV9mb3JtKFwiZm9ybUlkXCIpLmRhdGEgPSB7XG4gICAgICogICAgIFwibmFtZTFcIjogXCJ2YWwxXCJcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV3RGF0YVxuICAgICAqL1xuICAgIHNldCAkZGF0YSAobmV3RGF0YSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3RGF0YTtcbiAgICAgICAgZm9yIChsZXQgZWwgb2YgdGhpcy5fZm9ybUVscykge1xuICAgICAgICAgICAgbGV0IGNkYXRhID0gbmV3RGF0YVtlbC5uYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2RhdGEgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgY2RhdGEgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBlbC50eXBlID09PSBcImNoZWNrYm94XCIgfHwgZWwudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNkYXRhID09PSBlbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC52YWx1ZSA9IGNkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVFbENvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUVsQ29uKCk7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2EtZm9ybVwiLCBLYXNpbWlyRm9ybSwge2V4dGVuZHM6IFwiZm9ybVwifSk7IiwiXG5jbGFzcyBLYXNpbWlyU2VsZWN0IGV4dGVuZHMgSFRNTFNlbGVjdEVsZW1lbnQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fXyRvcHRpb25zID0gW107XG4gICAgfVxuXG5cbiAgICBfdXBkYXRlT3B0aW9ucygpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInVwZGF0ZU9wdGlvbnMoKVwiKTtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IG9wdGlvbiBvZiB0aGlzLl9fJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBvcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIG9wdEVsLnZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIG9wdEVsLmlubmVyVGV4dCA9IG9wdGlvbi50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRFbC52YWx1ZSA9IG9wdGlvbjtcbiAgICAgICAgICAgICAgICBvcHRFbC5pbm5lclRleHQgPSBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG9wdEVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGxldCBpbmlPcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy4kdmFsdWU7XG5cbiAgICAgICAgLy8gR2V0dGVycyAvIFNldHRlcnMgbm90IHBvc3NpYmxlIGlmIHByb3BlcnR5IGFscmVhZHkgZGVmaW5lZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIGlmIGVsZW1lbnQgaXMgbG9hZGVkIGJlZm9yZSBqc1xuICAgICAgICAvLyBUaGVyZWZvcjogYXBwbHkgb25seSBvbiBjb25uZWN0IGFuZCBrZWVwIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJyRvcHRpb25zJywge1xuICAgICAgICAgICAgc2V0OiAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fXyRvcHRpb25zID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fXyRvcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJyR2YWx1ZScsIHtcbiAgICAgICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIGluaU9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB0aGlzLiRvcHRpb25zID0gaW5pT3B0aW9ucztcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwia2Etc2VsZWN0XCIsIEthc2ltaXJTZWxlY3QsIHtleHRlbmRzOiBcInNlbGVjdFwifSk7Il19
