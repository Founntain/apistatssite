import { User } from "./User";

export class Language{
    LanguageName: string;
    Creator: User;
    KeyCount: number;
    CultureCode: string;
    LanguageData: object;
    ForceUpload: boolean;

    constructor(languageName: string, creator: User, keyCount: number, cultureCode: string, languageData: object, forceUpload: boolean){
        this.LanguageName = languageName;
        this.Creator = creator;
        this.KeyCount = keyCount;
        this.CultureCode = cultureCode;
        this.LanguageData = languageData;
        this.ForceUpload = forceUpload;
    }
}