"""
@author Kerem
"""
import itertools
from InfixToPrefix import infixToPrefix

def countLastOperator(oprArray):
    count = 0

    for i in oprArray:
        if i == oprArray[-1]:
            count += 1
    return count

# input should be like & & | CS102 CS114 | | MATH225 MATH220 MATH241 | | MATH230 MATH255 MATH260
# there should be whitespace between '&'s or '|'s and the course names should not include any
# whitespaces   CS 102 --> Wrong    CS102 --> Right
def showPossiblePaths(prefix_reqs):

    #split the string into array by whitespace
    arr = prefix_reqs.split()

    opr = []
    temp = []
    result = []

    index = 0
    #check if the process is finished
    while len(arr) != 0 or len(opr) != 0:
        #pushing the operators till a non operator object
        if len(arr) != 0 and (arr[0] == '|' or arr[0] == '&'):
            opr.append(arr.pop(0))
        else:
            count = countLastOperator(opr)          
            if opr[-1] == '|':
                temp.append([])
                for i in range(count):
                    temp[-1].append(arr.pop(0))
                    opr.pop()
                temp[-1].append(arr.pop(0))

            elif opr[-1] == '&':
                #the if below is added for cases that has no '|'
                if temp == []:
                    for i in range(count):
                        temp.append([])
                        temp[-1].append(arr.pop(0))
                    temp.append([])
                    temp[-1].append(arr.pop(0))
                
                # the if below is added for test case: '(EEE 102 or CS 223) and CS 102 '
                if arr != []:
                    temp.append(arr)
                    arr = []
                    
                for i in range(count):
                    result.append(temp.pop())
                    opr.pop()
                result.append(temp.pop())
            #the if below is added for cases that has no '&'
            if result == [] and len(arr) == 0:
                result = temp
    
    #itertools.product method is a cross product method
    str = ''
    for t in itertools.product(*result):
        str += ' '.join(t) + '-'
    str = str.split('-')
    str.pop()
    return str

#reqs = "(CS102 or CS114) and (MATH225 or MATH220 or MATH241) and (MATH230 or MATH255 or MATH260)";
#reqs = 'MATH 101 or MATH 111 or MATH 113 or PHYS 101 or PHYS 111 '
#reqs = 'CS 201 and MATH 132'
#reqs = "MATH 101 or MATH 111 or MATH 113 or PHYS 101 or PHYS 111"
#reqs = 'MATH 102 and PHYS 102'
#reqs = 'MATH 241'
#reqs = 'MATH 242 and PHYS 212 and PHYS 242'
#reqs = '(EEE 102 or CS 223) and CS 102 '

#print(infixToPrefix(reqs))
#print(showPossiblePaths(infixToPrefix(reqs)))
