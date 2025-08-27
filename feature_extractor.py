# feature_extractor.py
import torch
import torch.nn as nn
from torchvision import models
import numpy as np


class CNNFeatureExtractor:
    def __init__(self, backbone='resnet50', device=None):
        self.device = device or torch.device('cpu')
        if backbone == 'resnet50':
            model = models.resnet50(pretrained=True)
            modules = list(model.children())[:-1]  # remove final fc
            self.model = nn.Sequential(*modules).to(self.device)
            self.out_dim = 2048
        else:
            raise ValueError('backbone not supported')
        self.model.eval()

    def extract_features(self, dataloader):
        feats = []
        labels = []
        with torch.no_grad():
            for imgs, labs in dataloader:
                imgs = imgs.to(self.device)
                out = self.model(imgs)  # B x C x 1 x 1
                out = out.reshape(out.size(0), -1).cpu().numpy()
                feats.append(out)
                labels.extend(labs.numpy())
        X = np.vstack(feats)
        y = np.array(labels)
        return X, y 