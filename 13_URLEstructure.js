const myURL = new URL('https://www.example.org/courses/programming?order=views&level=1');
console.log(myURL.hostname); // www.example.org
console.log(myURL.pathname); // /courses/programming
console.log(myURL.searchParams); // URLSearchParams { 'order' => 'views', 'level' => '1' }
console.log(typeof myURL.searchParams); // object
console.log(myURL.searchParams.get('order')); // views
console.log(myURL.searchParams.get('level')); // 1
console.log(myURL.protocol); // https
