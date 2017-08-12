#InfixToPrefix

"""
Parameters: The prerequisite string, infix
Return: The prerequisite string, prefix
"""

def infixToPrefix(reqs):
    # the stack to hold the operations
    st = [];
    #initializes the prefix expression
    prefix = "";
    #temporary prefix to hold the parts in parantheses
    temp_prefix = " ";

    #removes all spaces
    reqs = reqs.replace(" ", "");
    #replaces language with logical operators
    reqs = reqs.replace('and', '&');
    reqs = reqs.replace('or', '|');

    #prefix is constructed here
    for ch in reqs:
        #if (, then adds to stack
        if ch is '(':
            st.append(ch);
        #if operator, then updates the temp if necessary and then adds to stack
        elif ch is '|' or ch is '&':
            if st and st[-1] is not '(':
                temp_prefix = st.pop() + temp_prefix;
            temp_prefix += " ";
            st.append(ch);
        #if ), then updates the temp if necessary and then adds to prefix
        elif ch is ')':
            if st and st[-1] is not '(':
                temp_prefix = st.pop() + temp_prefix;
            prefix += temp_prefix + " ";
            #resetting temp
            temp_prefix = "";
        #else, directly add to temp
        else:
            temp_prefix += ch;
    """
        If there are no parantheses, then prefix is empty, temp is nonempty.
        So, temp is added to prefix.
    """
    prefix += temp_prefix;
    #adds the operators behind parantheses
    while st:
        temp = st.pop()
        if temp is not '(':
            prefix = temp + prefix;

    return prefix;

def myInfixToPrefix(reqs):
    # the stack to hold the operations
    st = [];
    # initializes the prefix expression
    prefix = "";
    # temporary prefix to hold the parts in parantheses
    temp_prefix = "";

    # removes all spaces
    reqs = reqs.replace(" ", "");
    # replaces language with logical operators
    reqs = reqs.replace('and', '&');
    reqs = reqs.replace('or', '|');

    # prefix is constructed here
    for ch in reqs:
        if ch is '(':
            st.append('(');
        elif ch is ')':
            #adds last word to stack
            st.append(temp_prefix);
            temp_prefix = "";
            #pops from stack to prefix, through parantheses
            while st and st[-1] is not '(':
                prefix += st.pop() + " ";
        elif ch is '&' or ch is '|':
            #after the parantheses, operation is always in the start
            if temp_prefix is "":
                prefix = ch + " " + prefix;
            #in the parantheses, operation is added to prefix, word is added to stack
            else:
                st.append(temp_prefix);
                temp_prefix = "";
                prefix += ch + " ";
        #creates the words
        else:
            temp_prefix += ch;

    #if the last prereg is not in parantheses, it is nonempty. Adds that to prefix.
    prefix += temp_prefix;

    #adds the remaining words to prefix.
    while st:
        if st[-1] is not '(':
            prefix += st.pop();
        else:
            st.pop();

    return prefix;

#reqs = "(MATH 101 and MATH 102) or CS102";

#print(reqs)
#print(myInfixToPrefix(reqs))