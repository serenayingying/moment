$(function () {
    startTimer();

    $('.refresh-icon').on('click', function (e) {
        e.preventDefault();
        updateBackground();
        updateSlogan();
    });

    $('.user-input-remove i').on('click', function (e) {
        e.preventDefault();
        toggleToday();
    });

    $('.today-input').on('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleToday();
            var todayMessage = getTodayInput();
            updateTodayInput(todayMessage);
            $(this).val('');
        }
    });

    $('#newTodoInput').on('keydown', function (e) {
        if (e.keyCode == 13) {
            var message = $(this).val();
            addToDo(message);
            updateToDoCount(true);
            $(this).val('');
        }
    });

    $('.todo-list-wrapper ul').on('click', '.x-remove', function (e) {
        $(this).parent().remove();
        updateToDoCount(false);
    })

    $('.todo-list-wrapper ul').on('click', 'input', function (e) {
        var todo = $(this).next();
        if ($(this).prop('checked')) {
            todo.css('text-decoration', 'line-through');
            updateToDoCount(false);
        } else {
            todo.css('text-decoration', 'none');
            updateToDoCount(true);
        }
    });

    $('.register-wrapper .submit-wrapper a').on('click', function (e) {
        togglePage('login');
    });

    $('.login-wrapper .submit-wrapper a').on('click', function (e) {
        togglePage('register');
    });

    // 判断用户登录状态
    $.get('/session', function (result) {
        if (result.success) {
            updateUsername(result.account.name);
            togglePage('main');
        } else {
            togglePage('login');
        }
    });

    // 登录逻辑
    $('#login-button').on('click', function () {
        var name = $('#login-name').val();
        var password = $('#login-password').val();
        var postData = JSON.stringify({ name: name, password: password });
        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: postData,
            success: function (result) {
                if (result.success) {
                    updateUsername(name)
                    togglePage('main');
                } else {
                    alert(result.error);
                }
            }
        });
    });

    // 注册逻辑
    $('#register-button').on('click', function () {
        var name = $('#register-name').val();
        var password = $('#register-password').val();
        var postData = JSON.stringify({ name: name, password: password });
        $.ajax({
            url: '/register',
            method: 'POST',
            contentType: 'application/json',
            data: postData,
            success: function (result) {
                if (result.success) {
                    updateUsername(name);
                    togglePage('main');
                } else {
                    alert(result.error);
                }
            }
        });
    });
});

function startTimer() {
    updateTime();
    updateGreet();
    var seconds = new Date().getSeconds();
    setTimeout(startTimer, (60 - seconds) * 1000);
}

function updateTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();

    var hourStr = hour < 10 ? '0' + String(hour) : String(hour);
    var minStr = min < 10 ? '0' + String(min) : String(min);

    $('#current-time').text(hourStr + ':' + minStr);
}

function updateGreet() {
    var hour = new Date().getHours();
    var greet = '';
    if (hour < 6) {
        greet = 'Good night';
    } else if (hour < 12) {
        greet = 'Good morning';
    } else if (hour < 18) {
        greet = 'Good afternoon';
    } else {
        greet = 'Good evening';
    }
    $('#greet').text(greet);
}

function updateUsername(name) {
    $('#greet-name').text(name);
}

function updateBackground() {
    var sources = ['background00.jpg', 'background01.jpg', 'background02.jpg', 'background03.jpg', 'background04.jpg', 'background05.jpg'];
    var img = sources[Math.floor(Math.random() * sources.length)];
    $('.root').css('background-image', 'url(./assets/image/' + img + ')');
}

function updateSlogan() {
    var slogans = [
        'Obey your thirst.',
        'Take time to indulge.',
        'To me, the past is black and white, but the future is always color.',
        'Man Always Remember Love Because Of Romantic Only',
        'No business too small, no problem too big',
        'The greatest mistake you can make in life is to be continually fearing you will make one.'
    ];
    var slogan = slogans[Math.floor(Math.random() * slogans.length)];
    $('#slogan').text('"' + slogan + '"');
}

function toggleToday() {
    var todayWrapperUnset = $('.today-wrapper-unset');
    var todayWrapper = $('.today-wrapper');
    if (todayWrapperUnset.css('display') == 'none') {
        todayWrapperUnset.css('display', 'block');
        todayWrapper.css('display', 'none');
    } else {
        todayWrapperUnset.css('display', 'none');
        todayWrapper.css('display', 'block');
    }
}

function updateTodayInput(message) {
    $('.user-input').text(message);
}

function getTodayInput() {
    return $('.today-input').val();
}

function togglePage(target) {
    $('[data-page-target]').each(function () {
        if ($(this).data("pageTarget") == target) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });
}

function addToDo(todo) {
    $('.todo-list-wrapper ul').append('<li><input type="checkbox" />&nbsp;<span>' + todo + '</span><span class="x-remove">x</span></li>');
}

function updateToDoCount(increase) {
    var countStr = $('.todo-header-wrapper .count').text();
    var countNum = parseInt(countStr);
    if (increase) {
        countNum++;
    } else {
        countNum--;
    }
    $('.todo-header-wrapper .count').text(countNum);
}



