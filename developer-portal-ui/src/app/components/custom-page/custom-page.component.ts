/*
 * Copyright 2018-2024 adorsys GmbH & Co KG
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version. This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 *
 * This project is also available under a separate commercial license. You can
 * contact us at sales@adorsys.com.
 */

import { Component, DoCheck } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { CustomizeService } from '../../services/customize.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss'],
})
export class CustomPageComponent implements DoCheck {
  private name = 'faq';
  pathToFile = `./assets/content/i18n/en/${this.name}.md`;

  constructor(private languageService: LanguageService, private route: ActivatedRoute, private customizeService: CustomizeService) {}

  ngDoCheck() {
    this.name = this.route.snapshot.paramMap.get('name');
    if (this.name) {
      this.languageService.currentLanguage.subscribe((data) => {
        this.pathToFile = `${this.customizeService.currentLanguageFolder}/${data}/${this.name}.md`;
      });
    }
  }
}
