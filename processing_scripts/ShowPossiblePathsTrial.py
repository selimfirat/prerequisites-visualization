import itertools
from InfixToPrefix import infixToPrefix


def isOperator(char):
    return char is '&' or char is '|'


def operationAnd(operand1, operand2):
    if not isinstance(operand1, list):
        operand1 = [[operand1]]
    if not isinstance(operand2, list):
        operand2 = [[operand2]]

    return operand1 + operand2



def operationOr(operand1, operand2):
    bool = 0
    if not isinstance(operand1, list):
        bool += 1
        operand1 = [[operand1]]
    if not isinstance(operand2, list):
        bool += 2
        operand2 = [[operand2]]

    if bool is 3:
        return [operand1 + operand2]



def showPossiblePaths(prefix_reqs):

    # split the string into array by whitespace
    arr = prefix_reqs.split()

    # Stack to hold operands
    operandStk = []


    for element in reversed(arr):
        if isOperator(element):
            operand1 = operandStk.pop()
            operand2 = operandStk.pop()
            if element is '&':
                operandStk.append(operationAnd(operand1, operand2))
            else:
                operandStk.append(operationOr(operand1, operand2))
        else:
            operandStk.append(element)
    return operandStk[0]




# input should be like & & | CS102 CS114 | | MATH225 MATH220 MATH241 | | MATH230 MATH255 MATH260
# there should be whitespace between '&'s or '|'s and the course names should not include any
# whitespaces   CS 102 --> Wrong    CS102 --> Right


# reqs = "(CS102 and CS114) or (MATH225 and MATH220 and MATH241) or (MATH230 and MATH255 and MATH260)";
# reqs = 'MATH 101 or MATH 111 or MATH 113 or PHYS 101 or PHYS 111 '
# reqs = 'CS 201 or MATH 132'
# reqs = "MATH 101 or MATH 111 or MATH 113 or PHYS 101 or PHYS 111"
# reqs = 'MATH 102 and PHYS 102'
# reqs = 'MATH 241'
# reqs = 'MATH 242 and PHYS 212 and PHYS 242'
# reqs = '(EEE 102 or CS 223) and CS 102 and CS 114'

# print(infixToPrefix(reqs))
# print(showPossiblePaths(infixToPrefix(reqs)))
