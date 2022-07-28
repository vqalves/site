import { useRouter } from "next/router";
import { LocaleContent, LocaleType } from "./locale";

export function useDefaultPageElements() {
    const router = useRouter();
    const translator = LocaleType.getLocaleTypeByCode(router.locale);

    function translate<T>(content: LocaleContent<T>): T {
        return translator.getContent(content);
    }

    return {
        router: router,
        translator: translator,
        ts: translate
    }
}