const xhr = new XMLHttpRequest()
xhr.open('GET', './index.html', true)

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}

xhr.send()
