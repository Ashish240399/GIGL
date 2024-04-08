<?php

namespace app\controllers;

use yii\rest\ActiveController;
use Yii;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function actionCreate()
    {
        Yii::info('actionCreate method called');
        $model = new $this->modelClass;
    
        // Debugging code
        $postData = Yii::$app->request->post();
        Yii::error("POST data: " . print_r($postData, true));
    
        if ($model->load($postData, '') && $model->validate()) {
            $model->password = Yii::$app->getSecurity()->generatePasswordHash($model->password);
            if (!$model->save(false)) {
                Yii::error("Failed to save model: " . print_r($model->getErrors(), true));
            }
            return $model;
        } else {
            Yii::error("Failed to load or validate model");
        }
    
        // More debugging code
        Yii::error("Model errors: " . print_r($model->errors, true));
    
        return null;
    }
}