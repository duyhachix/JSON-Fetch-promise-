// example 1

// promise resolve, reject, all
// let promise1 = new Promise(function (resolve) {
// 	setTimeout(function () {
// 		resolve([1]);
// 	}, 2000);
// });

// let promise2 = new Promise(function (resolve) {
// 	setTimeout(function () {
// 		resolve([2, 3]);
// 	}, 4000);
// });

// Promise.all([promise1, promise2]).then(function (result) {
// 	// console.log(result);
// 	let result1 = result[0];
// 	let result2 = result[1];
// 	let concatArray = result1.concat(result2);
// 	// return concatArray;
// 	console.log(concatArray);
// });

// example 2
//let users = [
//	{
//		name: 'Đức',
//		id: 1,
//	},
//	{
//		name: 'Duy',
//		id: 2,
//	},
//	{
//		name: 'Tuệ',
//		id: 3,
//	},
//	{
//		name: 'Trung',
//		id: 4,
//	},
//	// ...
//];

//let comments = [
//	{
//		id: 1,
//		user_id: 1,
//		content: 'Anh học trường nào',
//	},
//	{
//		id: 2,
//		user_id: 2,
//		content: 'Anh học ĐHQG',
//	},
//	{
//		id: 3,
//		user_id: 1,
//		content: 'Còn em học ở NEU :3',
//	},
//];

// 1. lấy comment
// 2. từ comment lấy ra danh sách (user_id)
// 3. từ user_id lấy ra user tương ứng

// fake API
//function getComments() {
//	return new Promise(function (resolve) {
//		setTimeout(function () {
//			resolve(comments);
//		}, 1000);
//	});
//}

//function getUsersById(user_id) {
//	return new Promise((resolve) => {
//		let result = users.filter((user) => {
//			return user_id.includes(user.id);
//		});
//		setTimeout(() => {
//			resolve(result, 1, 2, 3);
//		}, 1000);
//	});
//}

//getComments()
//	.then(function (cmts) {
//		let userIds = cmts.map((e) => {
//			return e.user_id;
//		});

//		return getUsersById(userIds).then((users) => {
//			return {
//				users: users,
//				comments: comments,
//			};
//		});
//	})

//	.then((data) => {
//		let cmtBox = document.getElementById('comment-box');
//		let html = '';
//		data.comments.forEach((comment) => {
//			let user = data.users.find((user) => {
//				return user.id === comment.user_id;
//			});
//			html += `<li>${user.name}: ${comment.content}</li>`;
//		});
//		//cmtBox.innerHTML = html
//	});

// example 3: Fetch data from API

//let postAPI = 'https://jsonplaceholder.typicode.com/posts';

//fetch(postAPI)
//	.then((response) => {
//		console.log('response:', { response });
//		//console.log(typeof response.json());
//		return response.json();
//		//JSON.parse: JSON -> Js type
//	})

//	.then(function (posts) {
//		let htmls = posts.map((post) => {
//			return `<li>
//							<h2>${post.title}</h2>
//							<h3>${post.body}</h3>
//							</li>`;
//		});
//		//console.log(posts);
//		var html = htmls.join('');
//		document.getElementById('post-box').innerHTML = html;
//	})

//	.catch(function (error) {
//		alert('Có lỗi rồi bạn ơi');
//	});

// example 4: Json server, Postman

//fetch(coursesAPI)
//	.then(function (response) {
//		console.log('thành công:', response);
//		return response.json();
//	})
//	.then(function (courses) {
//		console.log(courses);
//	});

let coursesAPI = 'http://localhost:3000/courses';

// start web
function startWeb() {
	getCourse(renderCourses);
	handleCreateNew();
}

startWeb();

// functions

function getCourse(callback) {
	fetch(coursesAPI)
		.then(function (response) {
			return response.json();
		})
		.then(callback);
}

// tao moi khoa hoc bằng phương thức Post
function createCourses(data, callback) {
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	fetch(coursesAPI, options)
		.then(function (response) {
			response.json();
		})
		.then(callback);
	//console.log('create course function:', data);
}

// render data ra giao dien web
function renderCourses(courses) {
	let listCourses = document.querySelector('#courses-list');
	let htmls = courses.map(function (course) {
		return `
						<li class="course-item-${course.id}">
							<h4>${course.name}</h4>
							<p>${course.description}</p>
						<button onclick="handleDeleteCourse(${course.id})">X</button>
						</li>
		`;
	});
	listCourses.innerHTML = htmls.join('');
}

function handleCreateNew() {
	let createBtn = document.querySelector('#create');
	createBtn.onclick = function () {
		let name = document.querySelector('input[name= "name"]').value;
		let description = document.querySelector(
			'input[name= "description"]'
		).value;
		let formData = {
			name: name,
			description: description,
		};
		createCourses(formData, function () {
			getCourse(renderCourses);
		});
	};
}

// xóa khóa học
function handleDeleteCourse(id) {
	let options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		//body: JSON.stringify(data),
	};
	fetch(coursesAPI + '/' + id, options)
		.then(function (response) {
			response.json();
		})
		.then(function () {
			let courseItem = document.querySelector('.course-item-' + id);
			if (courseItem) {
				courseItem.remove();
			}
		});
}
