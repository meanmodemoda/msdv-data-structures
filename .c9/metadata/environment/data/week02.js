{"changed":true,"filter":false,"title":"week02.js","tooltip":"/data/week02.js","value":"\nvar fs = require('fs');\nvar cheerio = require('cheerio');\n\n// load the aa-m01 text file into a variable, `content`\n// this is the file that we created in week01.js\n\nvar content = fs.readFileSync('../data/aa-m01.txt');\n\n// load `content` into a cheerio object\nvar $ = cheerio.load(content);\n\n\n// write all addresses into a text file\n\n//1: identify smallest extractable element using copy JS path in DevTools\n//2: observe JS path patterns and identify differentiator: tr:nth-child(n+1) \n//3: extract address text block, and use various string methods to extract only the raw addresses and save them to an array named addPrep\n\nvar addPrep = []; \n\n$('tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(n+1) > td:nth-child(1)').each(function(i, elem) {\n    \n    addPrep.push($(elem).html().split('<br>')[2].trim().split(',')[0])\n});\n\n//after observing the output, I noticed there are some miscellaneous texts behind certain addresses need to be cleaned up (i.e., some address ended like \"Street (Basement)\".\n//The addSave function removes unecessary text after \"Street\".\n\n\nlet addSave=addPrep.map((item) => {\n  return (item.includes('Street')? item.substring(0,item.indexOf('Street')+6) : item);\n})\n\n\n//create json file and push addSave to json file and save json file locally\nvar data ={};\ndata.address = [];\ndata.address.push(addSave);\n\nfs.writeFileSync('../data/aa-m01-address.json',  JSON.stringify(data), function(err) {\n    if (err) throw err;\n    console.log('complete');\n    }\n);\n\n//below shows raw addresses parsed\n//fs.writeFileSync('../data/aa-m01-address.txt', addPrep);","undoManager":{"mark":95,"position":100,"stack":[[{"start":{"row":28,"column":0},"end":{"row":29,"column":0},"action":"insert","lines":["",""],"id":725},{"start":{"row":29,"column":0},"end":{"row":29,"column":1},"action":"insert","lines":["v"]},{"start":{"row":29,"column":1},"end":{"row":29,"column":2},"action":"insert","lines":["a"]},{"start":{"row":29,"column":2},"end":{"row":29,"column":3},"action":"insert","lines":["r"]}],[{"start":{"row":29,"column":3},"end":{"row":29,"column":4},"action":"insert","lines":[" "],"id":726},{"start":{"row":29,"column":4},"end":{"row":29,"column":5},"action":"insert","lines":["d"]},{"start":{"row":29,"column":5},"end":{"row":29,"column":6},"action":"insert","lines":["a"]},{"start":{"row":29,"column":6},"end":{"row":29,"column":7},"action":"insert","lines":["t"]},{"start":{"row":29,"column":7},"end":{"row":29,"column":8},"action":"insert","lines":["a"]}],[{"start":{"row":29,"column":8},"end":{"row":29,"column":9},"action":"insert","lines":[" "],"id":727},{"start":{"row":29,"column":9},"end":{"row":29,"column":10},"action":"insert","lines":["="]}],[{"start":{"row":29,"column":10},"end":{"row":29,"column":11},"action":"insert","lines":["{"],"id":728},{"start":{"row":29,"column":11},"end":{"row":29,"column":12},"action":"insert","lines":["}"]}],[{"start":{"row":29,"column":12},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":729}],[{"start":{"row":30,"column":0},"end":{"row":30,"column":1},"action":"insert","lines":["d"],"id":730},{"start":{"row":30,"column":1},"end":{"row":30,"column":2},"action":"insert","lines":["a"]},{"start":{"row":30,"column":2},"end":{"row":30,"column":3},"action":"insert","lines":["t"]}],[{"start":{"row":30,"column":3},"end":{"row":30,"column":4},"action":"insert","lines":["a"],"id":731}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"insert","lines":[" "],"id":732}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"remove","lines":[" "],"id":733},{"start":{"row":30,"column":3},"end":{"row":30,"column":4},"action":"remove","lines":["a"]},{"start":{"row":30,"column":2},"end":{"row":30,"column":3},"action":"remove","lines":["t"]},{"start":{"row":30,"column":1},"end":{"row":30,"column":2},"action":"remove","lines":["a"]},{"start":{"row":30,"column":0},"end":{"row":30,"column":1},"action":"remove","lines":["d"]},{"start":{"row":29,"column":12},"end":{"row":30,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":11},"action":"remove","lines":["addSave"],"id":734},{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"insert","lines":["d"]},{"start":{"row":30,"column":5},"end":{"row":30,"column":6},"action":"insert","lines":["a"]},{"start":{"row":30,"column":6},"end":{"row":30,"column":7},"action":"insert","lines":["t"]},{"start":{"row":30,"column":7},"end":{"row":30,"column":8},"action":"insert","lines":["a"]}],[{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"insert","lines":["."],"id":735},{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"insert","lines":["t"]},{"start":{"row":30,"column":10},"end":{"row":30,"column":11},"action":"insert","lines":["a"]}],[{"start":{"row":30,"column":11},"end":{"row":30,"column":12},"action":"insert","lines":["b"],"id":736},{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"insert","lines":["l"]},{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["e"]}],[{"start":{"row":36,"column":43},"end":{"row":36,"column":44},"action":"remove","lines":["v"],"id":737},{"start":{"row":36,"column":42},"end":{"row":36,"column":43},"action":"remove","lines":["s"]},{"start":{"row":36,"column":41},"end":{"row":36,"column":42},"action":"remove","lines":["c"]}],[{"start":{"row":36,"column":41},"end":{"row":36,"column":42},"action":"insert","lines":["j"],"id":738},{"start":{"row":36,"column":42},"end":{"row":36,"column":43},"action":"insert","lines":["s"]},{"start":{"row":36,"column":43},"end":{"row":36,"column":44},"action":"insert","lines":["o"]},{"start":{"row":36,"column":44},"end":{"row":36,"column":45},"action":"insert","lines":["n"]}],[{"start":{"row":36,"column":48},"end":{"row":40,"column":0},"action":"remove","lines":["addSave);","","","",""],"id":739},{"start":{"row":36,"column":48},"end":{"row":39,"column":5},"action":"insert","lines":[" JSON.stringify(data), function(err) {","    if (err) throw err;","    console.log('complete');","    }"]}],[{"start":{"row":29,"column":12},"end":{"row":29,"column":13},"action":"insert","lines":[";"],"id":740}],[{"start":{"row":29,"column":13},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":741},{"start":{"row":30,"column":0},"end":{"row":30,"column":1},"action":"insert","lines":["d"]},{"start":{"row":30,"column":1},"end":{"row":30,"column":2},"action":"insert","lines":["a"]},{"start":{"row":30,"column":2},"end":{"row":30,"column":3},"action":"insert","lines":["t"]},{"start":{"row":30,"column":3},"end":{"row":30,"column":4},"action":"insert","lines":["a"]}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"insert","lines":[" "],"id":742}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"remove","lines":[" "],"id":743}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":5},"action":"insert","lines":["."],"id":744},{"start":{"row":30,"column":5},"end":{"row":30,"column":6},"action":"insert","lines":["t"]},{"start":{"row":30,"column":6},"end":{"row":30,"column":7},"action":"insert","lines":["a"]},{"start":{"row":30,"column":7},"end":{"row":30,"column":8},"action":"insert","lines":["b"]},{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"insert","lines":["l"]},{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"insert","lines":["e"]}],[{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"remove","lines":["e"],"id":745},{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"remove","lines":["l"]},{"start":{"row":30,"column":7},"end":{"row":30,"column":8},"action":"remove","lines":["b"]},{"start":{"row":30,"column":6},"end":{"row":30,"column":7},"action":"remove","lines":["a"]},{"start":{"row":30,"column":5},"end":{"row":30,"column":6},"action":"remove","lines":["t"]}],[{"start":{"row":30,"column":5},"end":{"row":30,"column":6},"action":"insert","lines":["a"],"id":746},{"start":{"row":30,"column":6},"end":{"row":30,"column":7},"action":"insert","lines":["d"]},{"start":{"row":30,"column":7},"end":{"row":30,"column":8},"action":"insert","lines":["d"]},{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"insert","lines":["r"]},{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"insert","lines":["e"]},{"start":{"row":30,"column":10},"end":{"row":30,"column":11},"action":"insert","lines":["s"]},{"start":{"row":30,"column":11},"end":{"row":30,"column":12},"action":"insert","lines":["s"]}],[{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"insert","lines":[" "],"id":747},{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["="]}],[{"start":{"row":30,"column":14},"end":{"row":30,"column":15},"action":"insert","lines":[" "],"id":748}],[{"start":{"row":30,"column":15},"end":{"row":30,"column":17},"action":"insert","lines":["[]"],"id":749}],[{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"insert","lines":[";"],"id":750}],[{"start":{"row":30,"column":18},"end":{"row":31,"column":0},"action":"insert","lines":["",""],"id":751}],[{"start":{"row":32,"column":4},"end":{"row":32,"column":14},"action":"remove","lines":["data.table"],"id":752},{"start":{"row":32,"column":4},"end":{"row":32,"column":5},"action":"insert","lines":["a"]},{"start":{"row":32,"column":5},"end":{"row":32,"column":6},"action":"insert","lines":["d"]},{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"insert","lines":["d"]},{"start":{"row":32,"column":7},"end":{"row":32,"column":8},"action":"insert","lines":["S"]}],[{"start":{"row":32,"column":8},"end":{"row":32,"column":9},"action":"insert","lines":["a"],"id":753},{"start":{"row":32,"column":9},"end":{"row":32,"column":10},"action":"insert","lines":["v"]},{"start":{"row":32,"column":10},"end":{"row":32,"column":11},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":0},"end":{"row":36,"column":0},"action":"insert","lines":["",""],"id":754},{"start":{"row":36,"column":0},"end":{"row":36,"column":1},"action":"insert","lines":["a"]}],[{"start":{"row":36,"column":0},"end":{"row":36,"column":1},"action":"remove","lines":["a"],"id":755},{"start":{"row":35,"column":0},"end":{"row":36,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":29,"column":0},"end":{"row":31,"column":0},"action":"remove","lines":["var data ={};","data.address = [];",""],"id":756}],[{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["",""],"id":757},{"start":{"row":34,"column":0},"end":{"row":35,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":35,"column":0},"end":{"row":37,"column":0},"action":"insert","lines":["var data ={};","data.address = [];",""],"id":758}],[{"start":{"row":37,"column":0},"end":{"row":37,"column":1},"action":"insert","lines":["a"],"id":759},{"start":{"row":37,"column":1},"end":{"row":37,"column":2},"action":"insert","lines":["t"]},{"start":{"row":37,"column":2},"end":{"row":37,"column":3},"action":"insert","lines":["a"]}],[{"start":{"row":37,"column":2},"end":{"row":37,"column":3},"action":"remove","lines":["a"],"id":760},{"start":{"row":37,"column":1},"end":{"row":37,"column":2},"action":"remove","lines":["t"]},{"start":{"row":37,"column":0},"end":{"row":37,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":37,"column":0},"end":{"row":37,"column":1},"action":"insert","lines":["d"],"id":761},{"start":{"row":37,"column":1},"end":{"row":37,"column":2},"action":"insert","lines":["a"]},{"start":{"row":37,"column":2},"end":{"row":37,"column":3},"action":"insert","lines":["t"]},{"start":{"row":37,"column":3},"end":{"row":37,"column":4},"action":"insert","lines":["a"]},{"start":{"row":37,"column":4},"end":{"row":37,"column":5},"action":"insert","lines":["."]},{"start":{"row":37,"column":5},"end":{"row":37,"column":6},"action":"insert","lines":["a"]},{"start":{"row":37,"column":6},"end":{"row":37,"column":7},"action":"insert","lines":["d"]},{"start":{"row":37,"column":7},"end":{"row":37,"column":8},"action":"insert","lines":["d"]},{"start":{"row":37,"column":8},"end":{"row":37,"column":9},"action":"insert","lines":["r"]},{"start":{"row":37,"column":9},"end":{"row":37,"column":10},"action":"insert","lines":["e"]},{"start":{"row":37,"column":10},"end":{"row":37,"column":11},"action":"insert","lines":["s"]},{"start":{"row":37,"column":11},"end":{"row":37,"column":12},"action":"insert","lines":["s"]}],[{"start":{"row":37,"column":12},"end":{"row":37,"column":13},"action":"insert","lines":["."],"id":762},{"start":{"row":37,"column":13},"end":{"row":37,"column":14},"action":"insert","lines":["p"]},{"start":{"row":37,"column":14},"end":{"row":37,"column":15},"action":"insert","lines":["u"]},{"start":{"row":37,"column":15},"end":{"row":37,"column":16},"action":"insert","lines":["s"]},{"start":{"row":37,"column":16},"end":{"row":37,"column":17},"action":"insert","lines":["h"]}],[{"start":{"row":37,"column":17},"end":{"row":37,"column":19},"action":"insert","lines":["()"],"id":763}],[{"start":{"row":37,"column":18},"end":{"row":37,"column":19},"action":"insert","lines":["a"],"id":764},{"start":{"row":37,"column":19},"end":{"row":37,"column":20},"action":"insert","lines":["d"]},{"start":{"row":37,"column":20},"end":{"row":37,"column":21},"action":"insert","lines":["d"]},{"start":{"row":37,"column":21},"end":{"row":37,"column":22},"action":"insert","lines":["S"]},{"start":{"row":37,"column":22},"end":{"row":37,"column":23},"action":"insert","lines":["a"]},{"start":{"row":37,"column":23},"end":{"row":37,"column":24},"action":"insert","lines":["v"]},{"start":{"row":37,"column":24},"end":{"row":37,"column":25},"action":"insert","lines":["e"]}],[{"start":{"row":37,"column":26},"end":{"row":37,"column":27},"action":"insert","lines":[";"],"id":765}],[{"start":{"row":38,"column":0},"end":{"row":38,"column":41},"action":"remove","lines":["//save cleaned up text to a new text file"],"id":766}],[{"start":{"row":34,"column":0},"end":{"row":35,"column":0},"action":"insert","lines":["",""],"id":767},{"start":{"row":35,"column":0},"end":{"row":35,"column":1},"action":"insert","lines":["/"]},{"start":{"row":35,"column":1},"end":{"row":35,"column":2},"action":"insert","lines":["/"]},{"start":{"row":35,"column":2},"end":{"row":35,"column":3},"action":"insert","lines":["c"]},{"start":{"row":35,"column":3},"end":{"row":35,"column":4},"action":"insert","lines":["r"]},{"start":{"row":35,"column":4},"end":{"row":35,"column":5},"action":"insert","lines":["e"]},{"start":{"row":35,"column":5},"end":{"row":35,"column":6},"action":"insert","lines":["a"]},{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"insert","lines":["t"]},{"start":{"row":35,"column":7},"end":{"row":35,"column":8},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":8},"end":{"row":35,"column":9},"action":"insert","lines":[" "],"id":768},{"start":{"row":35,"column":9},"end":{"row":35,"column":10},"action":"insert","lines":["j"]},{"start":{"row":35,"column":10},"end":{"row":35,"column":11},"action":"insert","lines":["s"]},{"start":{"row":35,"column":11},"end":{"row":35,"column":12},"action":"insert","lines":["o"]},{"start":{"row":35,"column":12},"end":{"row":35,"column":13},"action":"insert","lines":["n"]}],[{"start":{"row":35,"column":13},"end":{"row":35,"column":14},"action":"insert","lines":[" "],"id":769},{"start":{"row":35,"column":14},"end":{"row":35,"column":15},"action":"insert","lines":["f"]},{"start":{"row":35,"column":15},"end":{"row":35,"column":16},"action":"insert","lines":["i"]},{"start":{"row":35,"column":16},"end":{"row":35,"column":17},"action":"insert","lines":["l"]},{"start":{"row":35,"column":17},"end":{"row":35,"column":18},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":18},"end":{"row":35,"column":19},"action":"insert","lines":[" "],"id":770},{"start":{"row":35,"column":19},"end":{"row":35,"column":20},"action":"insert","lines":["a"]},{"start":{"row":35,"column":20},"end":{"row":35,"column":21},"action":"insert","lines":["n"]},{"start":{"row":35,"column":21},"end":{"row":35,"column":22},"action":"insert","lines":["d"]}],[{"start":{"row":35,"column":22},"end":{"row":35,"column":23},"action":"insert","lines":[" "],"id":771},{"start":{"row":35,"column":23},"end":{"row":35,"column":24},"action":"insert","lines":["s"]},{"start":{"row":35,"column":24},"end":{"row":35,"column":25},"action":"insert","lines":["a"]}],[{"start":{"row":35,"column":24},"end":{"row":35,"column":25},"action":"remove","lines":["a"],"id":772},{"start":{"row":35,"column":23},"end":{"row":35,"column":24},"action":"remove","lines":["s"]}],[{"start":{"row":35,"column":23},"end":{"row":35,"column":24},"action":"insert","lines":["p"],"id":773},{"start":{"row":35,"column":24},"end":{"row":35,"column":25},"action":"insert","lines":["u"]},{"start":{"row":35,"column":25},"end":{"row":35,"column":26},"action":"insert","lines":["s"]},{"start":{"row":35,"column":26},"end":{"row":35,"column":27},"action":"insert","lines":["h"]}],[{"start":{"row":35,"column":27},"end":{"row":35,"column":28},"action":"insert","lines":[" "],"id":774},{"start":{"row":35,"column":28},"end":{"row":35,"column":29},"action":"insert","lines":["a"]},{"start":{"row":35,"column":29},"end":{"row":35,"column":30},"action":"insert","lines":["d"]},{"start":{"row":35,"column":30},"end":{"row":35,"column":31},"action":"insert","lines":["d"]},{"start":{"row":35,"column":31},"end":{"row":35,"column":32},"action":"insert","lines":["S"]},{"start":{"row":35,"column":32},"end":{"row":35,"column":33},"action":"insert","lines":["a"]},{"start":{"row":35,"column":33},"end":{"row":35,"column":34},"action":"insert","lines":["v"]},{"start":{"row":35,"column":34},"end":{"row":35,"column":35},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":35},"end":{"row":35,"column":36},"action":"insert","lines":[" "],"id":775},{"start":{"row":35,"column":36},"end":{"row":35,"column":37},"action":"insert","lines":["t"]},{"start":{"row":35,"column":37},"end":{"row":35,"column":38},"action":"insert","lines":["o"]}],[{"start":{"row":35,"column":38},"end":{"row":35,"column":39},"action":"insert","lines":[" "],"id":776},{"start":{"row":35,"column":39},"end":{"row":35,"column":40},"action":"insert","lines":["j"]},{"start":{"row":35,"column":40},"end":{"row":35,"column":41},"action":"insert","lines":["s"]},{"start":{"row":35,"column":41},"end":{"row":35,"column":42},"action":"insert","lines":["o"]},{"start":{"row":35,"column":42},"end":{"row":35,"column":43},"action":"insert","lines":["n"]}],[{"start":{"row":35,"column":43},"end":{"row":35,"column":44},"action":"insert","lines":[" "],"id":777},{"start":{"row":35,"column":44},"end":{"row":35,"column":45},"action":"insert","lines":["f"]},{"start":{"row":35,"column":45},"end":{"row":35,"column":46},"action":"insert","lines":["i"]},{"start":{"row":35,"column":46},"end":{"row":35,"column":47},"action":"insert","lines":["l"]},{"start":{"row":35,"column":47},"end":{"row":35,"column":48},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":48},"end":{"row":35,"column":49},"action":"insert","lines":[" "],"id":778},{"start":{"row":35,"column":49},"end":{"row":35,"column":50},"action":"insert","lines":["a"]},{"start":{"row":35,"column":50},"end":{"row":35,"column":51},"action":"insert","lines":["n"]},{"start":{"row":35,"column":51},"end":{"row":35,"column":52},"action":"insert","lines":["d"]}],[{"start":{"row":35,"column":52},"end":{"row":35,"column":53},"action":"insert","lines":[" "],"id":779},{"start":{"row":35,"column":53},"end":{"row":35,"column":54},"action":"insert","lines":["s"]},{"start":{"row":35,"column":54},"end":{"row":35,"column":55},"action":"insert","lines":["a"]},{"start":{"row":35,"column":55},"end":{"row":35,"column":56},"action":"insert","lines":["v"]},{"start":{"row":35,"column":56},"end":{"row":35,"column":57},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":57},"end":{"row":35,"column":58},"action":"insert","lines":[" "],"id":780}],[{"start":{"row":35,"column":57},"end":{"row":35,"column":58},"action":"remove","lines":[" "],"id":781}],[{"start":{"row":35,"column":57},"end":{"row":35,"column":58},"action":"insert","lines":[" "],"id":782},{"start":{"row":35,"column":58},"end":{"row":35,"column":59},"action":"insert","lines":["j"]},{"start":{"row":35,"column":59},"end":{"row":35,"column":60},"action":"insert","lines":["s"]},{"start":{"row":35,"column":60},"end":{"row":35,"column":61},"action":"insert","lines":["o"]},{"start":{"row":35,"column":61},"end":{"row":35,"column":62},"action":"insert","lines":["n"]}],[{"start":{"row":35,"column":62},"end":{"row":35,"column":63},"action":"insert","lines":[" "],"id":783},{"start":{"row":35,"column":63},"end":{"row":35,"column":64},"action":"insert","lines":["f"]},{"start":{"row":35,"column":64},"end":{"row":35,"column":65},"action":"insert","lines":["i"]},{"start":{"row":35,"column":65},"end":{"row":35,"column":66},"action":"insert","lines":["l"]},{"start":{"row":35,"column":66},"end":{"row":35,"column":67},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":67},"end":{"row":35,"column":68},"action":"insert","lines":[" "],"id":784},{"start":{"row":35,"column":68},"end":{"row":35,"column":69},"action":"insert","lines":["t"]},{"start":{"row":35,"column":69},"end":{"row":35,"column":70},"action":"insert","lines":["o"]}],[{"start":{"row":35,"column":70},"end":{"row":35,"column":71},"action":"insert","lines":[" "],"id":785}],[{"start":{"row":35,"column":70},"end":{"row":35,"column":71},"action":"remove","lines":[" "],"id":786},{"start":{"row":35,"column":69},"end":{"row":35,"column":70},"action":"remove","lines":["o"]},{"start":{"row":35,"column":68},"end":{"row":35,"column":69},"action":"remove","lines":["t"]}],[{"start":{"row":35,"column":68},"end":{"row":35,"column":69},"action":"insert","lines":["o"],"id":787}],[{"start":{"row":35,"column":68},"end":{"row":35,"column":69},"action":"remove","lines":["o"],"id":788}],[{"start":{"row":35,"column":68},"end":{"row":35,"column":69},"action":"insert","lines":["l"],"id":789},{"start":{"row":35,"column":69},"end":{"row":35,"column":70},"action":"insert","lines":["o"]},{"start":{"row":35,"column":70},"end":{"row":35,"column":71},"action":"insert","lines":["c"]},{"start":{"row":35,"column":71},"end":{"row":35,"column":72},"action":"insert","lines":["a"]},{"start":{"row":35,"column":72},"end":{"row":35,"column":73},"action":"insert","lines":["l"]},{"start":{"row":35,"column":73},"end":{"row":35,"column":74},"action":"insert","lines":["l"]},{"start":{"row":35,"column":74},"end":{"row":35,"column":75},"action":"insert","lines":["y"]}],[{"start":{"row":38,"column":27},"end":{"row":39,"column":0},"action":"remove","lines":["",""],"id":790}],[{"start":{"row":40,"column":49},"end":{"row":44,"column":0},"action":"remove","lines":["JSON.stringify(data), function(err) {","    if (err) throw err;","    console.log('complete');","    }",""],"id":791},{"start":{"row":40,"column":49},"end":{"row":44,"column":2},"action":"insert","lines":["JSON.stringify(data), function(err) {","    if (err) throw err;","    console.log('complete');","    }",");"]}],[{"start":{"row":23,"column":49},"end":{"row":23,"column":50},"action":"insert","lines":["t"],"id":792},{"start":{"row":23,"column":50},"end":{"row":23,"column":51},"action":"insert","lines":["r"]},{"start":{"row":23,"column":51},"end":{"row":23,"column":52},"action":"insert","lines":["i"]},{"start":{"row":23,"column":52},"end":{"row":23,"column":53},"action":"insert","lines":["m"]},{"start":{"row":23,"column":53},"end":{"row":23,"column":54},"action":"insert","lines":["("]},{"start":{"row":23,"column":54},"end":{"row":23,"column":55},"action":"insert","lines":[")"]},{"start":{"row":23,"column":55},"end":{"row":23,"column":56},"action":"insert","lines":["."]}],[{"start":{"row":45,"column":0},"end":{"row":46,"column":0},"action":"insert","lines":["",""],"id":793},{"start":{"row":46,"column":0},"end":{"row":47,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":47,"column":0},"end":{"row":51,"column":2},"action":"insert","lines":["fs.writeFileSync('../data/aa-m01-address.json',  JSON.stringify(data), function(err) {","    if (err) throw err;","    console.log('complete');","    }",");"],"id":794}],[{"start":{"row":47,"column":41},"end":{"row":47,"column":45},"action":"remove","lines":["json"],"id":795},{"start":{"row":47,"column":41},"end":{"row":47,"column":42},"action":"insert","lines":["c"]},{"start":{"row":47,"column":42},"end":{"row":47,"column":43},"action":"insert","lines":["s"]},{"start":{"row":47,"column":43},"end":{"row":47,"column":44},"action":"insert","lines":["v"]}],[{"start":{"row":47,"column":47},"end":{"row":51,"column":2},"action":"remove","lines":[" JSON.stringify(data), function(err) {","    if (err) throw err;","    console.log('complete');","    }",");"],"id":796},{"start":{"row":47,"column":46},"end":{"row":47,"column":47},"action":"remove","lines":[" "]}],[{"start":{"row":47,"column":46},"end":{"row":47,"column":47},"action":"insert","lines":[" "],"id":797},{"start":{"row":47,"column":47},"end":{"row":47,"column":48},"action":"insert","lines":["a"]},{"start":{"row":47,"column":48},"end":{"row":47,"column":49},"action":"insert","lines":["d"]},{"start":{"row":47,"column":49},"end":{"row":47,"column":50},"action":"insert","lines":["d"]}],[{"start":{"row":47,"column":50},"end":{"row":47,"column":51},"action":"insert","lines":["S"],"id":798},{"start":{"row":47,"column":51},"end":{"row":47,"column":52},"action":"insert","lines":["a"]},{"start":{"row":47,"column":52},"end":{"row":47,"column":53},"action":"insert","lines":["v"]},{"start":{"row":47,"column":53},"end":{"row":47,"column":54},"action":"insert","lines":["e"]}],[{"start":{"row":47,"column":54},"end":{"row":47,"column":55},"action":"insert","lines":[")"],"id":799},{"start":{"row":47,"column":55},"end":{"row":47,"column":56},"action":"insert","lines":[";"]}],[{"start":{"row":47,"column":43},"end":{"row":47,"column":44},"action":"remove","lines":["v"],"id":800},{"start":{"row":47,"column":42},"end":{"row":47,"column":43},"action":"remove","lines":["s"]},{"start":{"row":47,"column":41},"end":{"row":47,"column":42},"action":"remove","lines":["c"]}],[{"start":{"row":47,"column":41},"end":{"row":47,"column":42},"action":"insert","lines":["t"],"id":801},{"start":{"row":47,"column":42},"end":{"row":47,"column":43},"action":"insert","lines":["e"]},{"start":{"row":47,"column":43},"end":{"row":47,"column":44},"action":"insert","lines":["x"]},{"start":{"row":47,"column":44},"end":{"row":47,"column":45},"action":"insert","lines":["t"]}],[{"start":{"row":47,"column":44},"end":{"row":47,"column":45},"action":"remove","lines":["t"],"id":802},{"start":{"row":47,"column":43},"end":{"row":47,"column":44},"action":"remove","lines":["x"]},{"start":{"row":47,"column":42},"end":{"row":47,"column":43},"action":"remove","lines":["e"]}],[{"start":{"row":47,"column":42},"end":{"row":47,"column":43},"action":"insert","lines":["x"],"id":803},{"start":{"row":47,"column":43},"end":{"row":47,"column":44},"action":"insert","lines":["t"]}],[{"start":{"row":47,"column":50},"end":{"row":47,"column":54},"action":"remove","lines":["Save"],"id":804},{"start":{"row":47,"column":50},"end":{"row":47,"column":51},"action":"insert","lines":["P"]},{"start":{"row":47,"column":51},"end":{"row":47,"column":52},"action":"insert","lines":["r"]},{"start":{"row":47,"column":52},"end":{"row":47,"column":53},"action":"insert","lines":["e"]},{"start":{"row":47,"column":53},"end":{"row":47,"column":54},"action":"insert","lines":["p"]}],[{"start":{"row":46,"column":0},"end":{"row":46,"column":1},"action":"insert","lines":["?"],"id":805},{"start":{"row":46,"column":1},"end":{"row":46,"column":2},"action":"insert","lines":["?"]}],[{"start":{"row":46,"column":1},"end":{"row":46,"column":2},"action":"remove","lines":["?"],"id":806},{"start":{"row":46,"column":0},"end":{"row":46,"column":1},"action":"remove","lines":["?"]}],[{"start":{"row":46,"column":0},"end":{"row":46,"column":1},"action":"insert","lines":["/"],"id":807},{"start":{"row":46,"column":1},"end":{"row":46,"column":2},"action":"insert","lines":["/"]},{"start":{"row":46,"column":2},"end":{"row":46,"column":3},"action":"insert","lines":["c"]},{"start":{"row":46,"column":3},"end":{"row":46,"column":4},"action":"insert","lines":["o"]},{"start":{"row":46,"column":4},"end":{"row":46,"column":5},"action":"insert","lines":["m"]},{"start":{"row":46,"column":5},"end":{"row":46,"column":6},"action":"insert","lines":["m"]},{"start":{"row":46,"column":6},"end":{"row":46,"column":7},"action":"insert","lines":["e"]}],[{"start":{"row":46,"column":6},"end":{"row":46,"column":7},"action":"remove","lines":["e"],"id":808},{"start":{"row":46,"column":5},"end":{"row":46,"column":6},"action":"remove","lines":["m"]},{"start":{"row":46,"column":4},"end":{"row":46,"column":5},"action":"remove","lines":["m"]},{"start":{"row":46,"column":3},"end":{"row":46,"column":4},"action":"remove","lines":["o"]},{"start":{"row":46,"column":2},"end":{"row":46,"column":3},"action":"remove","lines":["c"]}],[{"start":{"row":46,"column":2},"end":{"row":46,"column":3},"action":"insert","lines":["b"],"id":809},{"start":{"row":46,"column":3},"end":{"row":46,"column":4},"action":"insert","lines":["e"]},{"start":{"row":46,"column":4},"end":{"row":46,"column":5},"action":"insert","lines":["l"]},{"start":{"row":46,"column":5},"end":{"row":46,"column":6},"action":"insert","lines":["o"]},{"start":{"row":46,"column":6},"end":{"row":46,"column":7},"action":"insert","lines":["w"]}],[{"start":{"row":46,"column":7},"end":{"row":46,"column":8},"action":"insert","lines":[" "],"id":810},{"start":{"row":46,"column":8},"end":{"row":46,"column":9},"action":"insert","lines":["s"]},{"start":{"row":46,"column":9},"end":{"row":46,"column":10},"action":"insert","lines":["h"]},{"start":{"row":46,"column":10},"end":{"row":46,"column":11},"action":"insert","lines":["o"]},{"start":{"row":46,"column":11},"end":{"row":46,"column":12},"action":"insert","lines":["w"]},{"start":{"row":46,"column":12},"end":{"row":46,"column":13},"action":"insert","lines":["s"]}],[{"start":{"row":46,"column":13},"end":{"row":46,"column":14},"action":"insert","lines":[" "],"id":811},{"start":{"row":46,"column":14},"end":{"row":46,"column":15},"action":"insert","lines":["o"]},{"start":{"row":46,"column":15},"end":{"row":46,"column":16},"action":"insert","lines":["r"]},{"start":{"row":46,"column":16},"end":{"row":46,"column":17},"action":"insert","lines":["i"]},{"start":{"row":46,"column":17},"end":{"row":46,"column":18},"action":"insert","lines":["g"]},{"start":{"row":46,"column":18},"end":{"row":46,"column":19},"action":"insert","lines":["i"]},{"start":{"row":46,"column":19},"end":{"row":46,"column":20},"action":"insert","lines":["n"]}],[{"start":{"row":46,"column":19},"end":{"row":46,"column":20},"action":"remove","lines":["n"],"id":812},{"start":{"row":46,"column":18},"end":{"row":46,"column":19},"action":"remove","lines":["i"]},{"start":{"row":46,"column":17},"end":{"row":46,"column":18},"action":"remove","lines":["g"]},{"start":{"row":46,"column":16},"end":{"row":46,"column":17},"action":"remove","lines":["i"]},{"start":{"row":46,"column":15},"end":{"row":46,"column":16},"action":"remove","lines":["r"]},{"start":{"row":46,"column":14},"end":{"row":46,"column":15},"action":"remove","lines":["o"]}],[{"start":{"row":46,"column":14},"end":{"row":46,"column":15},"action":"insert","lines":["r"],"id":813},{"start":{"row":46,"column":15},"end":{"row":46,"column":16},"action":"insert","lines":["a"]},{"start":{"row":46,"column":16},"end":{"row":46,"column":17},"action":"insert","lines":["w"]}],[{"start":{"row":46,"column":17},"end":{"row":46,"column":18},"action":"insert","lines":[" "],"id":814},{"start":{"row":46,"column":18},"end":{"row":46,"column":19},"action":"insert","lines":["a"]},{"start":{"row":46,"column":19},"end":{"row":46,"column":20},"action":"insert","lines":["d"]},{"start":{"row":46,"column":20},"end":{"row":46,"column":21},"action":"insert","lines":["d"]},{"start":{"row":46,"column":21},"end":{"row":46,"column":22},"action":"insert","lines":["r"]},{"start":{"row":46,"column":22},"end":{"row":46,"column":23},"action":"insert","lines":["e"]}],[{"start":{"row":46,"column":23},"end":{"row":46,"column":24},"action":"insert","lines":["s"],"id":815},{"start":{"row":46,"column":24},"end":{"row":46,"column":25},"action":"insert","lines":["s"]}],[{"start":{"row":46,"column":25},"end":{"row":46,"column":26},"action":"insert","lines":[" "],"id":816},{"start":{"row":46,"column":26},"end":{"row":46,"column":27},"action":"insert","lines":["p"]},{"start":{"row":46,"column":27},"end":{"row":46,"column":28},"action":"insert","lines":["a"]},{"start":{"row":46,"column":28},"end":{"row":46,"column":29},"action":"insert","lines":["r"]},{"start":{"row":46,"column":29},"end":{"row":46,"column":30},"action":"insert","lines":["s"]},{"start":{"row":46,"column":30},"end":{"row":46,"column":31},"action":"insert","lines":["e"]},{"start":{"row":46,"column":31},"end":{"row":46,"column":32},"action":"insert","lines":["e"]}],[{"start":{"row":46,"column":31},"end":{"row":46,"column":32},"action":"remove","lines":["e"],"id":817}],[{"start":{"row":46,"column":31},"end":{"row":46,"column":32},"action":"insert","lines":["d"],"id":818}],[{"start":{"row":46,"column":25},"end":{"row":46,"column":26},"action":"insert","lines":["e"],"id":819},{"start":{"row":46,"column":26},"end":{"row":46,"column":27},"action":"insert","lines":["s"]}],[{"start":{"row":47,"column":0},"end":{"row":47,"column":1},"action":"insert","lines":["/"],"id":820},{"start":{"row":47,"column":1},"end":{"row":47,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":15,"column":2},"end":{"row":15,"column":7},"action":"remove","lines":["step "],"id":821}],[{"start":{"row":16,"column":6},"end":{"row":16,"column":7},"action":"remove","lines":[" "],"id":822},{"start":{"row":16,"column":5},"end":{"row":16,"column":6},"action":"remove","lines":["p"]},{"start":{"row":16,"column":4},"end":{"row":16,"column":5},"action":"remove","lines":["e"]},{"start":{"row":16,"column":3},"end":{"row":16,"column":4},"action":"remove","lines":["t"]},{"start":{"row":16,"column":2},"end":{"row":16,"column":3},"action":"remove","lines":["s"]}],[{"start":{"row":17,"column":6},"end":{"row":17,"column":7},"action":"remove","lines":[" "],"id":823},{"start":{"row":17,"column":5},"end":{"row":17,"column":6},"action":"remove","lines":["p"]},{"start":{"row":17,"column":4},"end":{"row":17,"column":5},"action":"remove","lines":["e"]},{"start":{"row":17,"column":3},"end":{"row":17,"column":4},"action":"remove","lines":["t"]},{"start":{"row":17,"column":2},"end":{"row":17,"column":3},"action":"remove","lines":["s"]}],[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"insert","lines":["",""],"id":824},{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":26,"column":0},"end":{"row":27,"column":0},"action":"remove","lines":["",""],"id":825},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""]}]]},"ace":{"folds":[],"scrolltop":240,"scrollleft":0,"selection":{"start":{"row":36,"column":0},"end":{"row":44,"column":2},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":37,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1631386946427}