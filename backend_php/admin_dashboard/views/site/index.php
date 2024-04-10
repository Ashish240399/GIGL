<?php

/** @var yii\web\View $this */

$this->title = 'Redirecting...';
Yii::$app->response->redirect(['/user/index'])->send();