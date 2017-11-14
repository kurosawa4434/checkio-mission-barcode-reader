"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import randint

LEFT = [[39, 51, 27, 33, 29, 57, 5, 17, 9, 23],
        [13, 25, 19, 61, 35, 49, 47, 59, 55, 11]]
RIGHT = [114, 102, 108, 66, 92, 78, 80, 68, 72, 116]
EO_TABLE = [63, 52, 50, 49, 44, 38, 35, 42, 41, 37]


def create_barcode_random():

    fd = randint(0, 9)
    bar = ''
    answer = [fd]

    for i in range(11):
        d = randint(0, 9)
        answer.append(d)
        if i < 6:
            bar += format(LEFT[int(
                format(EO_TABLE[fd], '06b')[i])][d], '07b')
        else:
            bar += format(RIGHT[d], '07b')

    cd = 10 - sum(a*(1, 3)[i % 2] for i, a in enumerate(answer)) % 10
    cd = cd if cd < 10 else 0

    answer.append(cd)

    bar = ''.join([
                '101',
                bar[:42],
                '01010',
                bar[42:],
                format(RIGHT[cd], '07b'),
                '101'])
    bar = bar.translate(str.maketrans('01', ' _'))

    backward = bool(randint(0, 1));

    if backward:
        bar = bar[::-1]

    return ''.join(map(str, answer)), bar, backward

random_tests = []

for _ in range(10):
    answer, bar, backward = create_barcode_random()
    random_tests.append({
                'input': bar,
                'answer': answer,
                'explanation': [answer, '', backward]
            })

TESTS = {
    "Basics": [
        {
            "input": '_ _   _ __ _  ___ __  __  _  __ ____ _  ___ _ _ _ __  __ __ __  _    _ _ ___  _  ___ _   _  _ _',
            "answer": '5901234123457',
            "explanation": ['5901234123457', '', False]
        },
        {
            "input": '_ _   __ _ _  ___ ____ _   _ __  _ ___  ___ _ _ _ __  __ _  ___ _  ___ _ ___  _  _   _ _    _ _',
            "answer": '4003994155486',
            "explanation": ['4003994155486', '', False]
        },
        {
            "input": '_ _ __   _ ___  _ ___ __ _  ___   _  _   _ __ _ _ __ __  _  _   _  _   __  __ _ _    __  __ _ _',
            "answer": '8557089288161',
            "explanation": ['8557089288161', '', False]
        },
        {
            "input": '_ _ ___ __  __  _  _  __ ____ _ _   __ __   _ _ _ _ _    _   _  _  _   ___ _  __  __ __  __ _ _',
            "answer": '0712345678911',
            "explanation": ['0712345678911', '', False]
        },
        {
            "input": '_ _ __  __ __  __  _ ___   _  _  _   _    _ _ _ _ _   __ __   _ _ ____ __  _  _  __  __ ___ _ _',
            "answer": '0712345678911',
            "explanation": ['0712345678911', 'Scanned backwards', True]
        },
        {
            "input": '_ _   _ __  __  _ _  ___  ___ _  _ ___ ___ __ _ _ _ _    _  ___ _    _ _ _    __  __ ___  _ _ _',
            "answer": '3910497653610',
            "explanation": ['3910497653610', 'Checksum zero case', False]
        },
        {
            "input": '_ _ ___ __  __  _  _  __ ____ _ _   __ __   _ _ _ _ _    _   _  _  _   ___ _  __  __ __ __  _ _',
            "answer": None,
            "explanation": ['0712345678912', 'wrong check digit', False]
        },
        {
            "input": '___  _  __  _ ___   _ __ _ ____   _  _  _   _ _ _ _ _    __  __ _    _ _ _    _ _    _  ___ _ _',
            "answer": None,
            "explanation": ['', 'wrong left guard bar', False]
        },
        {
            "input": '_ _  _  __  _ ___   _ __ _ ____   _  _  _   _ _ ___ _    __  __ _    _ _ _    _ _    _  ___ _ _',
            "answer": None,
            "explanation": ['', 'wrong center bar', False]
        },
        {
            "input": '_ _  _  __  _ ___   _ __ _ ____   _  _  _   _ _ _ _ _    __  __ _    _ _ _    _ _    _  ___ ___',
            "answer": None,
            "explanation": ['', 'wrong right guard bar', False]
        },
    ],
    "Randoms": random_tests
}
