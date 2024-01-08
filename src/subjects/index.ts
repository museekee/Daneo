import hanmun from "./hanmun"
import _2023_2_last_hanmun from "./2023_2_last_hanmun"
import test_hanmun from "./test_hanmun"
import hanmun_saja from "./hanmun_saja"


export default (() => {
    const imports:
    {
        name: string,
        type: string,
        data: Record<string, string | string[]>
    }[] = [
        hanmun,
        _2023_2_last_hanmun,
        test_hanmun,
        hanmun_saja,
    ]

    return imports.map(item => {
        return {
            name: item.name,
            type: item.type,
            data: Object.entries(item.data).map(elem => {
                if (typeof elem[1] === "string")
                    return {
                        word: elem[0],
                        mean: [elem[1]]
                    }
                else
                    return {
                        word: elem[0],
                        mean: elem[1]
                    }
            })
        }
    })
})()