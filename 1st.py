docs=['My Name is','What is your name','Name is Hannah','This is my name','My name is Eve']
word_count = {}
for line in docs:
    line = line.strip()
    line = line.lower()
    words = line.split(" ")
    for word in words:
        if word in word_count:
            word_count[word] = word_count[word] + 1
        else:
            word_count[word] = 1
for key in list(word_count.keys()):
    print(key, ":", word_count[key])