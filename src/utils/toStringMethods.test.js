import * as toStringMethods from './toStringMethods';

describe('toStringMethods', () => {
    describe('booleanToString', () => {
        it('should return True if the value is true', () => {
            const value = true;
            const expectedString = 'True';
    
            const string = toStringMethods.booleanToString(value);
    
            expect(string).toEqual(expectedString);
        });
    
        it('should return False if the value is false', () => {
            const value = false;
            const expectedString = 'False';
    
            const string = toStringMethods.booleanToString(value);
    
            expect(string).toEqual(expectedString);
        });
    });
    

    describe('verifySameObject', () => {
        it('should return the number representation of a given value', () => {
            const object1 = { a: 1, b: 2 };
            const object2 = { a: 1, b: 2 };
            const expectedString = true;

            const string = toStringMethods.verifySameObject(object1, object2);

            expect(string).toEqual(expectedString);
        });
    });
});