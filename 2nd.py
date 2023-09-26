docs=['My Name is','What is your name','Name is Hannah','This is my name','My name is Eve']
word_count = {}
for line in docs:
    line = line.strip()
    line = line.lower()
    words = line.split(" ")
    for word in words:
        length = len(word)
        if length in word_count:
            word_count[length] +=1
        else:
            word_count[length] = 1
word_count
for key in sorted(list(word_count.keys())):
    print("Word length",key,":", word_count[key]," words")