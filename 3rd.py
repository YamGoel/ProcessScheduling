docs=['My Name is','What is your name','Name is Hannah','This is my name','My name is Eve']
count=0
def checkPalindrome(word):
    if word.lower() == word.lower()[::-1]:
        return True
for line in docs:
    line = line.strip()
    line = line.lower()
    words = line.split(" ")
    for word in words:
        if(checkPalindrome(word)):
            count+=1
print("Total Palindromic Word: ",count)