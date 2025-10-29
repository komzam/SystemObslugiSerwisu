import {useTranslations} from "next-intl";
import {CombinedGraphQLErrors} from "@apollo/client/errors";

type TranslationFunction = ReturnType<typeof useTranslations>;

export function ErrorName(err: unknown, translations: TranslationFunction) {
    if (CombinedGraphQLErrors.is(err)) {
        const code = err.errors[0].extensions?.code as string | undefined;
        if(!code)
            return translations("generalError");
        else if (translations.has(code))
            return translations(code);
        else
            return translations("generalError");
    }else{
        return translations("generalError");
    }
}