const tagListElement = document.getElementById('tagList');
const tagSelectElement = document.getElementById('tagSelect');
const postListElement = document.getElementById('postList');

const tagForm = document.getElementById('tagForm');
const postForm = document.getElementById('postForm');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function createTag(tag) {
    if (tagListElement.querySelector(`li[data-tag="${tag}"]`) || tagSelectElement.querySelector(`option[value="${tag}"]`)) {
        return;
    }

    const tagListItem = document.createElement('li');
    tagListItem.setAttribute('data-tag', tag); // 添加一个 data-tag 属性，用于检查标签是否存在
    tagListItem.textContent = tag;
    tagListElement.appendChild(tagListItem);

    const tagOption = document.createElement('option');
    tagOption.value = tag;
    tagOption.textContent = tag;
    tagSelectElement.appendChild(tagOption);

    let tags = JSON.parse(localStorage.getItem('tags')) || [];
    tags.push(tag);
    localStorage.setItem('tags', JSON.stringify(tags));
}


function loadTags() {
    tagListElement.innerHTML = '';
    tagSelectElement.innerHTML = '';

    let tags = JSON.parse(localStorage.getItem('tags')) || [];
    tags.forEach(tag => {
        createTag(tag);
    });
}

tagForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const tagInput = document.getElementById('tagInput');
    const tag = tagInput.value;

    createTag(tag);

    tagForm.reset();
});

loadTags();

postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const postInput = document.getElementById('postInput');
    const imageInput = document.getElementById('imageInput');
    const tagSelect = document.getElementById('tagSelect');

    const post = {
        id: Date.now(),
        content: postInput.value,
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
        tag: tagSelect.value,
        comments: []
    };

    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    displayPost(post);

    postForm.reset();
});

posts.forEach(post => {
    displayPost(post);
});

function displayPost(post) {
    const postListItem = document.createElement('li');
    postListItem.setAttribute('data-id', post.id);
    postListItem.innerHTML = `
        <p>${post.content}</p>
        <p><strong>Tag:</strong> ${post.tag}</p>
    `;

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.style.maxWidth = '300px';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.marginBottom = '10px';
        postListItem.appendChild(img);
    }

    const commentList = document.createElement('ul');
    post.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);
    });
    postListItem.appendChild(commentList);

    const commentForm = document.createElement('form');
    commentForm.innerHTML = `
        <input type="text" class="commentInput" placeholder="Enter a comment">
        <button type="submit" class="addComment">Add Comment</button>
    `;
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentInput = commentForm.querySelector('.commentInput');
        const comment = commentInput.value;

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentPost = posts.find(p => p.id === post.id);
        currentPost.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));

        const commentItem = document.createElement('li');
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);

        commentForm.reset();
    });
    postListItem.appendChild(commentForm);

    postListElement.appendChild(postListItem);
}

const commentListElement = document.getElementById('commentList');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');

let activityCount = 0;
const activityCountElement = document.getElementById('activityCount');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const comment = commentInput.value;

    const commentListItem = document.createElement('li');
    commentListItem.textContent = comment;
    commentListElement.appendChild(commentListItem);

    activityCount++;
    activityCountElement.textContent = activityCount.toString();

    commentForm.reset();
});

