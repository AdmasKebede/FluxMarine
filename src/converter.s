.text
.globl _convert
_convert:
    pushl %ebp         # save ebp in stack
    movl 8(%esp), %eax # get the address of
                       # input
  label:
     movb (%eax),%dl# get the content
     cmpb $'A', %dl # compare with letter A
     jb label1      # leave if less than
     cmpb $'Z', %dl # compare with letter Z
     ja label1      # leave if greater than
     subb $0x20, %dl# change to uppercase

  label1:
     movb %dl, (%eax)# store data back into
                     # the array
     incl %eax       # get next character
     cmpl $0, (%eax) # is it the null
                     # character?
     jne label   # if not, do one more loop
     popl %ebp          # pop ebp
     ret
     .end