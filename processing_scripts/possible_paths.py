import pandas as pd


def is_operator(char):
    return char is '&' or char is '|'


def operation_or(operand1, operand2):
    paths = []
    for op1 in operand1:
        for op2 in operand2:
            if not isinstance(op1, list):
                op1 = [op1]
            if not isinstance(op2, list):
                op2 = [op2]

            paths += [op1] + [op2]

    return paths


def operation_and(op1, op2):
    paths = []

    if not isinstance(op1[0], list) and not isinstance(op2[0], list):
        paths += [op1 + op2]
    elif isinstance(op1[0], list):
        for e1 in op1:
            paths += operation_and(e1, op2)
    elif isinstance(op2[0], list):
        for e2 in op2:
            paths += operation_and(op1, e2)

    return paths


def simplify_ors(paths):
    df = pd.DataFrame(paths)
    df = df.drop_duplicates()
    df = df.dropna()

    paths = df.values.tolist()

    return paths


def get_possible_paths(prefix_reqs):

    # split the string into array by whitespace
    arr = prefix_reqs.split()

    # Stack to hold operands
    operandStk = []

    res = []

    for element in reversed(arr):
        if is_operator(element):
            operand1 = operandStk.pop()
            operand2 = operandStk.pop()
            if element == '|':
                tmp = operation_or(operand1, operand2)
                operandStk.append(tmp)
                res.append(tmp)

            else:
                tmp = operation_and(operand1, operand2)
                operandStk.append(tmp)
                res.append(tmp)
        else:
            operandStk.append([element.strip()])

    paths = simplify_ors(operandStk[0]) if len(operandStk) > 0 else []

    return paths
