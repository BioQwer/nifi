/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import NfRegistryApi from 'services/nf-registry.api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FdsSnackBarService } from '@nifi-fds/core';

/**
 * NfRegistryDeleteBundleVersion constructor.
 *
 * @param nfRegistryApi         The api service.
 * @param fdsSnackBarService    The FDS snack bar service module.
 * @param matDialogRef          The angular material dialog ref.
 * @param data                  The data passed into this component.
 * @constructor
 */
function NfRegistryDeleteBundleVersion(nfRegistryApi, fdsSnackBarService, matDialogRef, data) {
    // Services
    this.snackBarService = fdsSnackBarService;
    this.nfRegistryApi = nfRegistryApi;
    this.dialogRef = matDialogRef;
    // local state
    this.keepDialogOpen = false;
    this.protocol = location.protocol;
    this.droplet = data.droplet;
    this.selectedVersion = this.droplet.snapshotMetadata[0].version;
}

NfRegistryDeleteBundleVersion.prototype = {
    constructor: NfRegistryDeleteBundleVersion,

    /**
     * Delete specified bundle version.
     */
    deleteVersion: function () {
        var self = this;
        var version = this.selectedVersion;

        this.nfRegistryApi.deleteBundleVersion(this.droplet.link.href, version).subscribe(function (response) {
            if (!response.status || response.status === 200) {
                self.snackBarService.openCoaster({
                    title: 'Success',
                    message: 'Bundle version successfully deleted.',
                    verticalPosition: 'bottom',
                    horizontalPosition: 'right',
                    icon: 'fa fa-check-circle-o',
                    color: '#1EB475',
                    duration: 3000
                });

                if (self.keepDialogOpen !== true) {
                    self.dialogRef.close();
                }
            } else {
                self.dialogRef.close();
            }
        });
    },

    /**
     * Cancel the deletion of the bundle version and close dialog.
     */
    cancel: function () {
        this.dialogRef.close();
    }
};

NfRegistryDeleteBundleVersion.annotations = [
    new Component({
        templateUrl: './nf-registry-delete-bundle-version.html'
    })
];

NfRegistryDeleteBundleVersion.parameters = [
    NfRegistryApi,
    FdsSnackBarService,
    MatDialogRef,
    MAT_DIALOG_DATA
];

export default NfRegistryDeleteBundleVersion;
