export const pressedKey = {
    },
    key = {
        shift: 16,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        B: 66,
        M: 77
    };
let _key;
for (_key of Object.keys(key)) {
    key['key' + key[_key]] = _key; // c.f: key['key16'] = 'shift';
    pressedKey[_key] = 0;
}