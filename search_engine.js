all_professors_titles = Object.getOwnPropertyNames(all_professors)
all_papers_titles = Object.getOwnPropertyNames(all_papers)
temp = all_papers_titles[0]
all_papers_titles.splice(0, 1);
all_papers_titles.splice(20861, 0, temp);

unique_word_count = 51387
word_count_arts = 200354
word_count_business = 125640
word_count_engineering = 144756
word_count_health = 223501
word_count_unknown = 165153

function PreProcessSearchSentence(sentence){
    sentence = sentence.toLowerCase();

    sentence.split('').forEach(letter => {
        if(chars.includes(letter)){
            sentence = sentence.replace(letter, " ");
        }
    });

    sentence = sentence.split(" ")
    sentence = sentence.filter(item => item.length != 0 && !stop_words.includes(item))
    return sentence
}

function SearchForPaper(search_input) {
    search_input = PreProcessSearchSentence(search_input)
    search_input_temp = []

    docs_scores = {}
    search_words_docIDs = []

    sentences_to_return = []

    //Removing unneeded words
    inverted_index_keys = Object.keys(inverted_index_papers)
    search_input.forEach(word => {
        
        if(inverted_index_keys.includes(word)){
            search_input_temp.push(word)
        }
    });


    //Adding array of docIDs together
    search_input_temp.forEach(word => {
        search_words_docIDs = search_words_docIDs.concat(inverted_index_papers[word])
    });
    
    //Filling docs_scores dictionary of docIDs with value 0 (Removing duplicates)
    Array.from(new Set(search_words_docIDs)).forEach(doc_index =>{
        docs_scores[doc_index] = 0
    });

    //Increment docIDs' scores based on occurrences
    search_input_temp.forEach(word =>{
        inverted_index_papers[word].forEach(doc_index =>{
            docs_scores[doc_index] += 1
        });
    });


    //Sorting docs scores
    entries = Object.entries(docs_scores);
    sorted = entries.sort((a, b) => a[1] - b[1]);
    sorted.reverse();
    
    //Adding matching titles to array
    sorted.forEach(doc => {
        sentences_to_return.push(all_papers_titles[doc[0]])
    })

    return sentences_to_return
}

function SearchForProfessor(search_input) {
    search_input.split('').forEach(letter => {
        if(chars.includes(letter)){
            search_input = search_input.replace(letter, " ");
        }
    });

    search_input = search_input.toLowerCase().split(" ")
    search_input_temp = []

    docs_scores = {}
    search_words_docIDs = []

    sentences_to_return = []

    //Removing unneeded words
    inverted_index_keys = Object.keys(inverted_index_professors)
    search_input.forEach(word => {
        
        if(inverted_index_keys.includes(word)){
            search_input_temp.push(word)
        }
    });


    //Adding array of docIDs together
    search_input_temp.forEach(word => {
        search_words_docIDs = search_words_docIDs.concat(inverted_index_professors[word])
    });
    
    //Filling docs_scores dictionary of docIDs with value 0 (Removing duplicates)
    Array.from(new Set(search_words_docIDs)).forEach(doc_index =>{
        docs_scores[doc_index] = 0
    });

    //Increment docIDs' scores based on occurrences
    search_input_temp.forEach(word =>{
        inverted_index_professors[word].forEach(doc_index =>{
            docs_scores[doc_index] += 1
        });
    });


    //Sorting docs scores
    entries = Object.entries(docs_scores);
    sorted = entries.sort((a, b) => a[1] - b[1]);
    sorted.reverse();
    
    //Adding matching titles to array
    sorted.forEach(doc => {
        sentences_to_return.push(all_professors_titles[doc[0]])
    })

    return sentences_to_return
}


function Probability(word, class_index){
    if (Object.getOwnPropertyNames(words_class_index).includes(word)){
        return (words_class_index[word][class_index] + 1) / (word_count_arts + unique_word_count)
    }
    else{
        return 1 / (word_count_arts + unique_word_count)
    }
}

function ClassifySentence(sentence){
    probabilities = [0, 0, 0, 0, 0]
    classes = ["Arts", "Business", "Engineering", "Health", "Unknown"]
    sentence = PreProcessSearchSentence(sentence)
    
    for (let class_index = 0; class_index < probabilities.length; class_index++) {
        words_probability = 1
        
        sentence.forEach(word => {
            words_probability *= Probability(word, class_index)
        })            
        
        probabilities[class_index] = words_probability
    }

    if(probabilities.reduce((a, b) => a + b, 0) / probabilities.length == probabilities[0]){
        return "Unknown"
    }
    else{
        return classes[probabilities.indexOf(Math.max(...probabilities))];
    }
}